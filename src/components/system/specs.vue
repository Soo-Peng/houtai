<template>
  <div>
    <!-- 面包屑导航区 -->
    <div class="top">
      <v-bread></v-bread>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <el-button class="topBurron" type="primary" plain @click="addDilog"
        >添加</el-button
      >
      <div class="cart">
        <v-table  @editItem="editItem"></v-table>
      </div>
    </div>
    <add-dilog ref="AddDilog" :dlgInfo="dlgInfo" @cancel="cancelDilog"></add-dilog>
  </div>
</template>

<script>
import vBread from "../../common/vBread";
import addDilog from "./specs/dialogInfo";
import vTable from "./specs/specsTable";
export default {
  data() {
    return {
      dlgInfo: {
        isShow: false,
        isAdd: true, //用于控制添加或者编辑 true是添加
        editId: null,
      },
    };
  },
  methods: {
    addDilog() {
      this.dlgInfo = {
        isShow: true,
        isAdd: true,
      };
    },
    cancelDilog() {
      this.dlgInfo.isShow = false;
    },
    editItem(e) {
       this.dlgInfo = {
        isShow: true,
        isAdd: false,
      };
      this.$refs.AddDilog.seachOneSpecs(e)
    },
  },
  components: {
    vBread,
    addDilog,
    vTable,
  },
};
</script>

<style  lang="" scoped>

</style>
