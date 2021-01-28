<template>
  <div>
    <el-table :data="memberList" border style="width: 100%">

      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>


      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editItem(scope.row.uid)"
            >编辑</el-button
          >
        </template></el-table-column
      >
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// console.log(mapGetters);
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$stroe);
    this.getMemberList();
  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    editItem(id) {
      this.$emit("editItem", id);
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
      memberList: "member/getMemberList",
    }),
  },
};
</script>

<style  lang="" scoped>
.el-table {
  font-size: 14px !important;
}
.img {
  width: 200px;
}
</style>
