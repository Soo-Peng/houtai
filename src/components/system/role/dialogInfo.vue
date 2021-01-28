<template>
  <div>
    <el-dialog
      :title="dlgInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="dlgInfo.isShow"
      :before-close="handleClose"
    >
      <el-form :rules="rules" :model="role" label-width="100px" ref="formRef">
        <el-form-item label="角色名称：" prop="rolename">
          <el-input v-model="role.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色名称：">
          <el-tree
            :data="menuListTree"
            show-checkbox
            node-key="id"
            :props="treeProp"
            :default-expand-all="true"
            ref="treeRef"
            :default-checked-keys='defKeys'
            check-strictly
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="角色名称：">
          <el-switch
            v-model="role.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dlgInfo.isAdd" type="primary" @click="addRole"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editRole">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { axiosAddRole, axiosSearchOneRole, axiosEditRole } from "@/util/axios";
export default {
  props: ["dlgInfo"],
  data() {
    return {
      role: {
        rolename: "",
        menus: [],
        status: 1,
      },
      treeProp: {
        label: "title",
      },
      defKeys : [],
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
    }),
    handleClose() {
      this.cancel();
    },
    cancel() {
      this.$refs.formRef.resetFields();
      this.$refs.treeRef.setCheckedKeys([]);
      this.$emit("cancel");
    },
    addRole() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return this.$message.info("请完确认信息填写正确！");
        }
        this.role.menus = [...this.$refs.treeRef.getCheckedKeys()];
        axiosAddRole(this.role)
          .then((res) => {
            if (res.data.code !== 200) {
               this.$refs.formRef.resetFields();
              return this.$message.error(res.data.msg);
            }
            this.cancel();
            this.getRoleList();
            return this.$message.success("角色添加成功！");
          })
          .catch((err) => {
            return this.$message.error("服务器错误，添加失败！");
          });
      });
    },
    editRole() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return this.$message.info("请完确认信息填写正确！");
        }
        // let TreekeyArry = this.$refs.treeRef.getCheckedKeys();
        // this.role.menus = TreekeyArry;
        // console.log(TreekeyArry);
        this.role.menus = [...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()];
        // TreekeyArry = [...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()];
        // console.log(TreekeyArry);
        axiosEditRole(this.role).then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg);
          }
          this.getRoleList();
          this.$message.success("修改角色信息成功！");
          this.cancel();
        });
      });
    },
    searchOneRole(id) {
      axiosSearchOneRole(id)
        .then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error("角色信息获取失败！");
          }
          //   console.log(res);
          this.role.id = id;
          this.role.rolename = res.data.list.rolename;
          this.role.status = res.data.list.status;
          let checkedKey = res.data.list.menus.split(",");
          
          checkedKey = checkedKey[0].trim() == "" ? [] : checkedKey.map(Number);
          this.defKeys = checkedKey;
          // console.log(checkedKey);
          // this.$refs.treeRef.setCheckedKeys(checkedKey);
        })
        .catch((err) => {
          return this.$message.error("服务器错误，角色信息获取失败！");
        });
    },
  },
  computed: {
    ...mapGetters({
      menuListTree: "menu/getMenuListTree",
    }),
  },
};
</script>

<style  lang="" scoped>
</style>
