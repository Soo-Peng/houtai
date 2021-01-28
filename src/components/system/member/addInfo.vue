<template>
  <div>
    <!-- 弹框内容 -->
    <!-- el-dialog 
    visible	是否显示 Dialog，支持 .sync 修饰符 -->
    <el-dialog
      title="编辑会员"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
    >
      <el-form :rules="rules" ref="memberRef" :model="member" label-width="120px">
        <el-form-item prop="phone" label="手机号：">
          <el-input v-model="member.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称：">
          <el-input v-model="member.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input v-model="member.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态：">
          <el-switch
            v-model="member.status"
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
        <el-button  type="primary" @click="editMember">编辑</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {
  axiosGetGoodsList,
  axiosSearchOneMember,
  axiosEditMember,
} from "@/util/axios";
import { indexRouter } from "@/router/index";

import { mapActions } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      //菜单添加表单
      member: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1, //状态1正常2禁用
      },
      DateTime: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      rules: {
        title: [
          { required: true, message: "请输入秒杀名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" },
        ],
      },
      goodList: [],
    };
  },
  mounted() {
    console.log(this.$store);

  },
  methods: {
    ...mapActions({
      getMemberList: "member/getMemberListAction",
    }),
    editMember() {
      this.$refs.memberRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按格式填写数据！");
        }
        axiosEditMember(this.member).then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg);
          }
          this.getMemberList();
          this.$message.success("修改成功！");
          this.cancel();
        });
      });
    },

    searchOne(uid) {
      axiosSearchOneMember(uid)
        .then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error("分类数据获取失败！");
          }
          this.member = res.data.list;
          this.member.uid = uid;
          this.member.password = '';
          console.log(this.member);
        })
        .catch((err) => {
          return this.$message.error("服务器错误，菜单数据获取失败！");
        });
    },
    cancel() {
      this.$emit("cancel", false);
      this.member.status = 1;
      this.$refs.memberRef.resetFields();
    },
  },
};
</script>

<style lang="" scoped></style>
