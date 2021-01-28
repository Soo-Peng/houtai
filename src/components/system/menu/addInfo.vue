<template>
  <div>
    <!-- 弹框内容 -->
    <!-- el-dialog 
    visible	是否显示 Dialog，支持 .sync 修饰符 -->
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
    >
      <el-form :rules="rules" ref="menuRef" :model="menu" label-width="120px">
        <el-form-item prop="title" label="菜单名称：">
          <el-input v-model="menu.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="pid" label="上级菜单：">
          <el-select v-model="menu.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型：">
          <el-radio v-model="menu.type" :label="1">目录</el-radio>
          <el-radio v-model="menu.type" :label="2">菜单</el-radio>
        </el-form-item>

        <el-form-item v-if="menu.type === 1" label="菜单图标：">
          <el-select v-model="menu.icon" placeholder="请选择">
            <el-option
              v-for="(item, index) in iconList"
              :key="index"
              :value="item"
            >
              <i :class="item"></i> {{ item }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-else label="菜单地址：">
          <el-select v-model="menu.url" placeholder="请选择">
            <el-option
              v-for="(item, index) in indexRouter"
              :key="index"
              :value="item.path"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态：">
          <el-switch
            v-model="menu.status"
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
        <el-button v-if="addInfo.isAdd" type="primary" @click="addMenu"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editMenu">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { axiosAddMenu, axiosSearchOneMenu, axiosEditMenu } from "@/util/axios";
import { indexRouter } from "@/router/index";

import { mapActions, mapGetters } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      //菜单添加表单
      menu: {
        pid: 0, //上级分类编号
        title: "", //标题
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      indexRouter,
      iconList: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-star-on",
        "el-icon-s-custom",
        "el-icon-menu",
        "el-icon-s-goods",
      ],
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2到 6 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
      },
    };
  },
  mounted() {
    console.log(this.$store);
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getMenuListTree: "menu/getMenuListTreeAction",
    }),
    addMenu() {
      this.$refs.menuRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按格式填写数据！");
        }
        if (this.menu.type === 1) {
          this.menu.url = "";
        } else {
          this.menu.icon = "";
        }
        axiosAddMenu(this.menu).then((res) => {
          console.log(res.data);
          if (res.data.code !== 200) {
            this.$refs.menuRef.resetFields();
            return this.$message.error(res.data.msg);
          }
          this.getMenuList();
          this.getMenuListTree();
          // this.getMenuListAction()
          this.$message.success("添加成功！");
          this.cancel();
        });
      });
    },
    editMenu() {
      this.$refs.menuRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按格式填写数据！");
        }
        if (this.menu.type === 1) {
          this.menu.url = "";
        } else {
          this.menu.icon = "";
        }
        axiosEditMenu(this.menu).then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg);
          }
          this.getMenuList();
          this.getMenuListTree();
          this.$message.success("修改成功！");
          this.cancel();
        });
      });
    },
    searchOne(id) {
      axiosSearchOneMenu(id)
        .then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error("菜单数据获取失败！");
          }
          this.menu = res.data.list;
          this.menu.id = id;
        })
        .catch((err) => {
          return this.$message.error("服务器错误，菜单数据获取失败！");
        });
    },
    cancel() {
      // console.log(this.$refs.menuRef);
      this.$emit("cancel", false);
      this.$refs.menuRef.resetFields();
      this.menu.icon='';
      this.menu.url=''
    },
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
};
</script>

<style lang="" scoped></style>
