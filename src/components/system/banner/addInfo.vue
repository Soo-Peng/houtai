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
      <el-form
        :rules="rules"
        ref="bannerRef"
        :model="banner"
        label-width="120px"
      >
        <el-form-item prop="title" label="分类名称：">
          <el-input v-model="banner.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            ref="imgRef"
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 预览展示 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item label="状态：">
          <el-switch
            v-model="banner.status"
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
        <el-button v-if="addInfo.isAdd" type="primary" @click="addBanner"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editBanner">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  axiosAddBanner,
  axiosSearchOneBanner,
  axiosEditBanner,
} from "@/util/axios";
import { indexRouter } from "@/router/index";

import { mapActions } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      //菜单添加表单
      banner: {
        title: "", //商品分类名称img
        img: "", //图片
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输如轮播图名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      imgUrl: "", //文件图片的配置对象
      fileList: [], //文件列表
    };
  },
  mounted() {
    console.log(this.$store);
  },
  methods: {
    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),
    addBanner() {
      this.$refs.bannerRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按格式填写数据！");
        }
        this.banner.img = this.imgUrl;
        axiosAddBanner(this.banner).then((res) => {
          if (res.data.code !== 200) {
            this.$refs.bannerRef.resetFields();
            return this.$message.error(res.data.msg);
          }
          this.getBannerList();
          this.$message.success("添加成功！");
          this.cancel();
        });
      });
    },
    editBanner() {
      this.$refs.bannerRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按格式填写数据！");
        }
        this.banner.img = this.imgUrl ;
        axiosEditBanner(this.banner).then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg);
          }
          this.getBannerList();
          this.$message.success("修改成功！");
          this.cancel();
        });
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    onChange(file) {
      console.log(file, "文件的属性配置");
      this.imgUrl = file.raw;
      console.log(this.imgUrl, "改变后的");
    },
    //预览时的删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log(this.imgUrl, "删除后的");
      this.imgUrl = "";
    },
    //方法预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    searchOne(id) {
      axiosSearchOneBanner(id).then((res) => {
        if (res.data.code !== 200) {
          return this.$message.error("分类数据获取失败！");
        }
        this.banner = res.data.list;
        this.banner.id = id;
        //   //当查询数据调取接口，给fileList数组赋值
        this.fileList = this.banner.img
          ? [{ url: this.$imgUrl + this.banner.img }]
          : [];
        this.imgUrl = this.banner.img;
        })
        .catch((err) => {
          return this.$message.error("服务器错误，菜单数据获取失败！");
      });
    },
    cancel() {
      this.$emit("cancel", false);
      this.$refs.imgRef.clearFiles();
      this.imgUrl = "";
      this.banner.status = 1;
      this.$refs.bannerRef.resetFields();
    },
  },
};
</script>

<style lang="" scoped></style>
