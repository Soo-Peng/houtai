<template>
  <div>
    <el-dialog
      :title="dlgInfo.isAdd ? '添加商品' : '修改商品'"
      :visible.sync="dlgInfo.isShow"
      :before-close="handleClose"
      @opened="createEditor"
    >
      <el-form :rules="rules" :model="goods" label-width="100px" ref="formRef">
        <el-form-item label="一级分类：" prop="first_cateid">
          <el-select v-model="goods.first_cateid" placeholder="请选择">
            <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
            <el-option
              v-for="item in sortList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类：" prop="second_cateid">
          <el-select v-model="goods.second_cateid" placeholder="请选择">
            <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
            <el-option
              v-for="item in SecondCateid"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称：" prop="goodsname">
          <el-input v-model="goods.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格：" prop="price">
          <el-input v-model="goods.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格：" prop="market_price">
          <el-input v-model="goods.market_price" autocomplete="off"></el-input>
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

        <el-form-item label="商品规格：" prop="specsid">
          <el-select
            v-model="goods.specsid"
            placeholder="请选择"
            @change="SecondSpecsattrFn"
          >
            <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性：" prop="specsattr">
          <el-select v-model="goods.specsattr" placeholder="请选择" multiple>
            <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
            <el-option
              v-for="(item, index) in SecondSpecsattr"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="goods.isnew" :label="1">是</el-radio>
          <el-radio v-model="goods.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio v-model="goods.ishot" :label="1">是</el-radio>
          <el-radio v-model="goods.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态：">
          <el-switch
            v-model="goods.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="商品描述：">
          <div id="editor"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dlgInfo.isAdd" type="primary" @click="addGoods"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editGoods">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import {
  axiosGetSpecsList,
  axiosSearchOneGoods,
  axiosSearchOneSpecs,
  axiosAddGoods,
  axiosEditGoods
} from "@/util/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["dlgInfo"],
  data() {
    return {
      //editor 初始值为空
      editor: null,
      fileList: [],
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览的弹框默认是false
      goods: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      attrArr: [
        {
          value: "",
        },
      ],
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2到 10个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          {
            pattern: /^[0-9]*$/,
            message: "只能输入数值",
            trigger: "blur",
          },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          {
            pattern: /^[0-9]*$/,
            message: "只能输入数值",
            trigger: "blur",
          },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "change" },
        ],
      },
      SecondSpecsattr: [],
      imgUrl: "",
      specsList: [],
    };
  },
  mounted() {
    this.getSortList();
    axiosGetSpecsList({
      size: 999,
      page: 1,
    })
      .then((res) => {
        if (res.data.code !== 200) {
          return this.$message.error("获取商品规格失败！");
        }
        this.specsList = res.data.list;
      })
      .catch((err) => {
        this.$message.error("获取商品规格失败！");
      });
  },
  methods: {
    ...mapActions({
      getSortList: "sort/getSortListAction",
      getGoodsList: "goods/getGoodsListAction",
      getGoodsListCount: "goods/getGoodsListCountAction",
    }),
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    delAttr(index) {
      // var index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    addGoods() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按照要求填写数据！");
        }
        this.goods.img = this.imgUrl;
        this.goods.description = this.editor.txt.html();
        // this.goods.specsattr = this.goods.specsattr.join(',');
        axiosAddGoods(this.goods).then((res) => {
          if (res.data.code !== 200) {
            this.$refs.formRef.resetFields();
            return this.$message.error(res.data.msg);
          }
          this.getGoodsList();
          this.getGoodsListCount();
          this.$message.success("添加成功！");
          this.cancel();
        });
      });
    },
    editGoods() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return this.$message.info("请完确认信息符合要求！");
        }
        this.goods.img = this.imgUrl;
        this.goods.description = this.editor.txt.html();
        axiosEditGoods(this.goods).then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg);
          }
          this.getGoodsList();
          this.$message.success("修改商品信息成功！");
          this.cancel();
        });
      });
    },
    seachOneGoods(id) {
      axiosSearchOneGoods(id)
        .then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error("规格信息获取失败！");
          }
          this.goods = res.data.list;
          this.goods.id = id;
          console.log(this.goods.img);
          this.imgUrl = this.goods.img;
          console.log(this.goods.specsattr);
          this.goods.specsattr = this.goods.specsattr.split(',');
          console.log(this.goods.specsattr);
          this.fileList = this.goods.img
            ? [{ url: this.$imgUrl + this.goods.img }]
            : [];
        })
        .catch((err) => {
          return this.$message.error("服务器错误，角色信息获取失败！");
        });
    },
    cancel() {
      this.$refs.imgRef.clearFiles();
      this.$emit("cancel");
      this.$refs.formRef.resetFields();
      this.goods.isnew = 1;
      this.goods.ishot = 1;
      this.goods.status = 1;
      this.imgUrl = "";
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    createEditor() {
      //实例化富文本编辑器
      this.editor = new E("#editor");
      //创建并初始化 把des 初识描述属性赋值
      this.editor.create();
      //初始化之后每次都重新赋空
      this.editor.txt.html(this.goods.description);
      //取值 this.editor.txt.html()
    },
    handleClose() {
      this.cancel();
    },
    //文件上传的限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //当文件改变时，触发的函数方法
    onChange(file) {
      console.log(file);
      this.imgUrl = file.raw;
    },
    //预览时的删除
    handleRemove(file, fileList) {
      this.imgUrl = "";
    },
    //方法预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    SecondSpecsattrFn() {

      console.log(this.specsList);
      this.goods.specsattr = "";
      let idx = this.specsList.findIndex(
        (item) => item.id == this.goods.specsid
      );
      if (idx == -1) {
       this.SecondSpecsattr = [];
       return 
      }
      this.SecondSpecsattr = this.specsList[idx].attrs;

      // axiosSearchOneSpecs(this.goods.specsid)
      //   .then((res) => {
      //     if (res.data.code !== 200) {
      //       return this.$message.error("获取商品规格失败！");
      //     }
      //     this.SecondSpecsattr = res.data.list[0].attrs;
      //     console.log(this.SecondSpecsattr);
      //   })
      //   .catch((err) => {
      //     return this.$message.error("服务器获取规格属性失败！");
      //   });
    },
  },
  computed: {
    ...mapGetters({
      sortList: "sort/getSortList",
    }),
    SecondCateid() {
      let idx = this.sortList.findIndex(
        (item) => item.id == this.goods.first_cateid
      );
      if (idx == -1) {
        return [];
      }
      return this.sortList[idx].children;
    },
  },
};
</script>

<style  lang="" scoped>
.inptClass {
  width: 50%;
}
</style>
