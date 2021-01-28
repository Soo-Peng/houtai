<template>
  <div>
    <div class="top">
      <v-bread></v-bread>
    </div>
    <div class="content">
      <el-button class="topBurron" type="primary" plain @click="addItem">添加</el-button>
      <div class="cart">
        <manger-table @editItem='editMangerItem'></manger-table>
      </div>
    </div>
    <manger-dlg ref="dlgRef" :dlgInfo='dlgInfo' @cancel='cancelDlg'></manger-dlg>
  </div>
</template>

<script>
import vBread from "../../common/vBread";
import mangerDlg from "./manger/dialogInfo";
import mangerTable from "./manger/mangerTable";
export default {
  data() {
    return {
      dlgInfo : {
          isShow : false,
          isAdd : true
      }
    };
  },
  mounted() {
    
  },
  methods: {
    addItem(){
      this.dlgInfo.isShow = true;
      this.dlgInfo.isAdd = true;
    },
    cancelDlg(){
      this.dlgInfo.isShow = false;
    },
    editMangerItem(uid){
      this.dlgInfo.isShow = true;
      this.dlgInfo.isAdd = false;
      this.$refs.dlgRef.seachOneManger(uid);
    }
  },
  components: {
    vBread,
    mangerDlg,
    mangerTable
  },
};
</script>

<style  lang="" scoped>
</style>
