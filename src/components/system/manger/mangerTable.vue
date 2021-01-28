<template>
  <div>
    <el-table :data="mangerList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名称" >
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" >
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editItem(scope.row.uid)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteItem(scope.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="mangerListCount"
        @current-change="change"
        :pager-count="7"
        :page-size="MangerPages.size"
      >
        <!-- pager-count 5和11之间的奇数 -->
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { axiosDeleManger } from "@/util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMangerList();
    this.getMangerListCount();
  },
  methods: {
    ...mapActions({
      getMangerList: "manger/getMangerListAction",
      getMangerListCount: "manger/getMangerListCountAction",
    }),
    ...mapMutations({
      setPage: "manger/SET_MANGERPAGESPAGE",
    }),
    change(page) {
      this.setPage(page);
      this.getMangerList();
    },
    deleteItem(uid) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axiosDeleManger(uid)
            .then((res) => {
              if (res.data.code !== 200) {
                return this.$message.error("删除管理员失败！");
              }
              this.getMangerList();
              this.getMangerListCount();
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
    editItem(uid){
      this.$emit('editItem',uid)
    }
  },
  computed: {
    ...mapGetters({
      mangerList: "manger/getMangerList",
      mangerListCount: "manger/getMangerListCount",
      MangerPages: "manger/getMangerPages",
    }),
  },
};
</script>

<style  lang="" scoped>
.page {
  margin: 15px;
}
.el-pagination {
  float: right;
}
</style>
