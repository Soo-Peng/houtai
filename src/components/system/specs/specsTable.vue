<template>
  <div>
    <el-table :data="specsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号"></el-table-column>

      <el-table-column prop="specsname" label="规格名称" >
      </el-table-column>

      <el-table-column label="规格属性" width='300'>
        <template slot-scope="scope">
          <div>
            <el-tag class="tag" v-for="(item,index) in scope.row.attrs" :key="index" type="info">{{item}}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editItem(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteItem(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="specsListCount"
        @current-change="change"
        :pager-count="7"
        :page-size="specsPages.size"
      >
        <!-- pager-count 5和11之间的奇数 -->
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { axiosDeleSpecs } from "@/util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getSpecsList();
    this.getSpecsListCount();
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsListCount: "specs/getSpecsListCountAction",
    }),
    ...mapMutations({
      setPage: "specs/SET_SPECSPAGESPAGE",
    }),
    change(page) {
      this.setPage(page);
      this.getSpecsList();
    },
    deleteItem(id) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axiosDeleSpecs(id)
            .then((res) => {
              if (res.data.code !== 200) {
                return this.$message.error("删除商品规格失败！");
              }
              this.getSpecsList();
              this.getSpecsListCount();
              return this.$message.success("删除成功");
            })
            .catch((err) => {
              return this.$message.error("服务器错误，删除失败！");
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    editItem(id){
      this.$emit('editItem',id)
    }
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsListCount: "specs/getSpecsListCount",
      specsPages: "specs/getSpecsPages",
    }),
  }
};
</script>

<style  lang="" scoped>
.page {
  margin: 15px;
}
.el-pagination {
  float: right;
}
.tag{
  margin: 2px 4px;
}
</style>
