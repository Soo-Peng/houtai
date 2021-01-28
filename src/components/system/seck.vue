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
    <add-dilog ref="AddDilog" :addInfo="addInfo" @cancel="cancelDilog"></add-dilog>
  </div>
</template>

<script>
import vBread from "../../common/vBread";
import addDilog from "./seck/addInfo";
import vTable from "./seck/seckTable";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true, //用于控制添加或者编辑 true是添加
        editId: null,
      },
    };
  },
  methods: {
    addDilog() {
      this.addInfo = {
        isShow: true,
        isAdd: true,
      };
    },
    cancelDilog() {
      this.addInfo.isShow = false;
    },
    editItem(e) {
       this.addInfo = {
        isShow: true,
        isAdd: false,
      };
      this.$refs.AddDilog.searchOne(e)
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
