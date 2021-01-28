<template>
  <div>
    <el-dialog
      :title="dlgInfo.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="dlgInfo.isShow"
      :before-close="handleClose"
    >
      <el-form :rules="rules" :model="manger" label-width="100px" ref="formRef">
        <el-form-item prop="roleid" label="所属角色：">
          <el-select v-model="manger.roleid" placeholder="请选择">
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :value="item.id"
              :label="item.rolename"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="用户名称：">
          <el-input v-model="manger.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码：">
          <el-input
            v-model="manger.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态：">
          <el-switch
            v-model="manger.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dlgInfo.isAdd" type="primary" @click="addManger"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editManger">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  axiosAddManger,
  axiosSearchOneManger,
  axiosEditManger,
} from "@/util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["dlgInfo"],
  data() {
    return {
      manger: {
        roleid: "",
        username: "",
        status: 1,
      },
      rules: {
        roleid: [{ required: true, message: "请选择角色", trigger: "change" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getMangerList: "manger/getMangerListAction",
      getMangerListCount: "manger/getMangerListCountAction",
    }),
    addManger() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按照要求填写数据！");
        }
        axiosAddManger(this.manger).then((res) => {
          console.log(res.data);
          if (res.data.code !== 200) {
            this.$refs.formRef.resetFields();
            return this.$message.error(res.data.msg);
          }
          this.getMangerList();
          this.getMangerListCount();

          this.$message.success("添加成功！");
          this.cancel();
        });
      });
    },
    editManger() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return this.$message.info("请完确认信息符合要求！");
        }
        axiosEditManger(this.manger).then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg);
          }
          this.getMangerList();
          this.$message.success("修改角色信息成功！");
          this.cancel();
        });
      });
    },
    seachOneManger(uid) {
      axiosSearchOneManger(uid)
        .then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error("管理员信息获取失败！");
          }
          this.manger.uid = uid;
          this.manger = res.data.list;
          this.manger.password = "";
        })
        .catch((err) => {
          return this.$message.error("服务器错误，角色信息获取失败！");
        });
    },
    cancel() {
      this.$emit("cancel");
      this.$refs.formRef.resetFields();
    },
    handleClose() {
      this.cancel();
    },
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
