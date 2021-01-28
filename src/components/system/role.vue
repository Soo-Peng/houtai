<template>
  <div>
    <div class="top">
      <v-bread></v-bread>
    </div>
    <div class="content">
      <el-button class="topBurron" type="primary" plain @click="addItem"
        >添加</el-button
      >
      <div class="cart">
        <role-table @editRole="editRoleItem"></role-table>
      </div>
    </div>
    <role-dlg ref="dlgRef" :dlgInfo="dlgInfo" @cancel="cancleDlg"></role-dlg>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import vBread from "../../common/vBread";
import roleTable from "./role/roleTable";
import roleDlg from "./role/dialogInfo";
export default {
  data() {
    return {
      dlgInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  mounted() {
    this.getMenuListTree();
  },
  methods: {
    ...mapActions({
      getMenuListTree: "menu/getMenuListTreeAction",
    }),
    addItem() {
      this.dlgInfo.isShow = true;
      this.dlgInfo.isAdd = true;
    },
    cancleDlg() {
      this.dlgInfo.isShow = false;
    },
    editRoleItem(id) {
      this.dlgInfo.isShow = true;
      this.dlgInfo.isAdd = false;
      this.$refs.dlgRef.searchOneRole(id);
    },
  },
  components: {
    vBread,
    roleTable,
    roleDlg,
  },
};
</script>

<style  lang="" scoped>
</style>
