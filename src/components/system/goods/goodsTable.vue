<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号"></el-table-column>

      <el-table-column prop="goodsname" label="商品名称" >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" >
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" >
      </el-table-column>

      <el-table-column label="图片" width='300'>
        <template slot-scope="scope">
          <img  class="img" :src="scope.row.img?$imgUrl+scope.row.img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=377440344,1498581111&fm=26&gp=0.jpg'" alt="">
        </template>
      </el-table-column>

      <el-table-column label="是否新品" width='60'>
        <template slot-scope="scope" >
          <el-tag v-if="scope.row.isnew == 1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width='60'>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ishot == 1" type="success">是</el-tag>
          <el-tag v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width='60'>
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
        :total="goodsListCount"
        @current-change="change"
        :pager-count="7"
        :page-size="goodsPages.size"
      >
        <!-- pager-count 5和11之间的奇数 -->
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { axiosDeleGoods } from "@/util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsList();
    this.getGoodsListCount();
  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListAction",
      getGoodsListCount: "goods/getGoodsListCountAction",
    }),
    ...mapMutations({
      setPage: "goods/SET_GOODSPAGESPAGE",
    }),
    change(page) {
      this.setPage(page);
      this.getGoodsList();
    },
    deleteItem(id) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axiosDeleGoods(id)
            .then((res) => {
              if (res.data.code !== 200) {
                return this.$message.error("删除商品失败！");
              }
              this.getGoodsList();
              this.getGoodsListCount();
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
      goodsList: "goods/getGoodsList",
      goodsListCount: "goods/getGoodsListCount",
      goodsPages: "goods/getGoodsPages",
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
.img{
  width: 200px;
}
</style>
