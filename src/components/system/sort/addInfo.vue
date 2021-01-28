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
      <el-form :rules="rules" ref="sortRef" :model="sort" label-width="120px">
        <el-form-item prop="pid" label="上级分类：">
          <el-select v-model="sort.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in sortList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="catename" label="分类名称：">
          <el-input v-model="sort.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="sort.pid != 0" label="图片">
          <!-- 
            上传视图 
            action	必选参数，上传的地址	string
            on-preview	点击文件列表中已上传的文件时的钩子	function(file)	—	—
            on-remove	文件列表移除文件时的钩子	function(file, fileList)
            
            on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            list-type	文件列表的类型
            auto-upload	是否在选取文件后立即进行上传 默认是true 
            file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array
            limit	最大允许上传个数	number
            on-exceed	文件超出个数限制时的钩子	function(files, fileList)
            -->
          <el-upload
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
            v-model="sort.status"
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
        <el-button v-if="addInfo.isAdd" type="primary" @click="addSort"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editSort">编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { axiosAddSort, axiosSearchOneSort, axiosEditSort } from "@/util/axios";
import { indexRouter } from "@/router/index";

import { mapActions, mapGetters } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      //菜单添加表单
      sort: {
        pid: 0, //上级分类编号
        catename: "", //商品分类名称img
        img: "", //图片
        status: 1, //状态1正常2禁用
      },
      rules: {
        catename: [
          { required: true, message: "请输如分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2到 8 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }],
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
      getSortList: "sort/getSortListAction",
    }),
    addSort() {
      this.$refs.sortRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按格式填写数据！");
        }
        this.sort.img = this.imgUrl;
        axiosAddSort(this.sort).then((res) => {
          if (res.data.code !== 200) {
            this.$refs.sortRef.resetFields();
            return this.$message.error(res.data.msg);
          }
          this.getSortList();
          this.$message.success("添加成功！");
          this.cancel();
        });
      });
    },
    editSort() {
      this.$refs.sortRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按格式填写数据！");
        }
        // this.sort.img = this.imgUrl ? this.imgUrl : this.sort.img;
        this.sort.img = this.imgUrl ;
        axiosEditSort(this.sort).then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg);
          }
          this.getSortList();
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
      axiosSearchOneSort(id)
        .then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error("分类数据获取失败！");
          }
          this.sort = res.data.list;
          this.sort.id = id;
          //当查询数据调取接口，给fileList数组赋值
          this.fileList = this.sort.img
            ? [{ url: this.$imgUrl + this.sort.img }]
            : [];
          this.imgUrl = this.sort.img;
        })
        .catch((err) => {
          return this.$message.error("服务器错误，菜单数据获取失败！");
        });
    },
    cancel() {
      this.$emit("cancel", false);
      this.$refs.sortRef.resetFields();
    },
  },
  computed: {
    ...mapGetters({
      sortList: "sort/getSortList",
    }),
  },
};
</script>

<style lang="" scoped></style>
