<template>
  <div>
    <el-table :data="bannerList" border style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>

      <el-table-column prop="title" label="轮播图标题"></el-table-column>

      <el-table-column label="图片" width="300">
        <template slot-scope="scope">
          <img
            class="img"
            :src="
              scope.row.img
                ? $imgUrl + scope.row.img
                : 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=377440344,1498581111&fm=26&gp=0.jpg'
            "
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column header-align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editItem(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)"
            >删除</el-button
          >
        </template></el-table-column
      >
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { axiosDeleBanner } from "@/util/axios";
// console.log(mapGetters);
export default {
  data() {
    return {};
  },
  mounted() {
    this.getBannerList();
  },
  methods: {
    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),
    deleteItem(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        console.log(id);
        axiosDeleBanner(id)
          .then((res) => {
            if (res.data.code !== 200) {
              return this.$message.error("删除失败！");
            }
            this.getBannerList();
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
      bannerList: "banner/getBannerList",
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
