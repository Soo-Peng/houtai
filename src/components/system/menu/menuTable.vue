<template>
  <div>
    <el-table
      :data="menuListTree"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      :default-expand-all="false"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="pid" label="上级菜单"></el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i v-if="scope.row.icon" :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editItem(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)"
            >删除</el-button
          >
        </template></el-table-column
      ></el-table
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { axiosDeleMenu } from "@/util/axios";
// console.log(mapGetters);
export default {
  data() {
    return {
    };
  },
  mounted() {
    console.log(this.$store);
    this.getMenuList();
    this.getMenuListTree();
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getMenuListTree: "menu/getMenuListTreeAction",
    }),
    deleteItem(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axiosDeleMenu(id)
          .then((res) => {
              if(res.data.code !== 200){
                 return this.$message.error('删除失败！')
              }
              this.getMenuList();
              this.getMenuListTree();
              return this.$message.success('删除成功');

          }).catch((err) => {
              return this.$message.error('服务器错误，删除失败！')
          });


        })
        .catch(() => {
          this.$message.info( "已取消删除");
        });
      console.log(id);
    },
    editItem(id){
      this.$emit('editItem',id);
    },
    // 表格样式
    tableHeaderColor() {
      const styleStr = {
        fontWeight: "bold",
      };
      return styleStr;
    },
    tableRowStyle({ row, rowIndex }) {
      let styleJson = {};
      styleJson = {
        fontSize: "14px",
      };
      return styleJson; // 返回对象
    },
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
      menuListTree: "menu/getMenuListTree",
    }),
  },
};
</script>

<style  lang="" scoped>
.el-table {
  font-size: 14px !important;
}
</style>
