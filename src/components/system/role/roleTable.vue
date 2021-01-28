<template>
  <div>
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="id" width="200" label="角色编号">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
      <el-table-column label="状态" width="160">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editItem(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteItem(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { axiosDeleRole } from "@/util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
    }),
    deleteItem(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axiosDeleRole(id)
            .then((res) => {
              if (res.data.code !== 200) {
                return this.$message.error("删除角色失败！");
              }
              this.getRoleList();
              return this.$message.success("删除成功");
            })
            .catch((err) => {
              return this.$message.error("服务器错误，删除失败！");
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
      console.log(id);
    },
    editItem(id){
        this.$emit('editRole',id)
    }
  },
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
