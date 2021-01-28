<template>
  <div>
    <el-dialog
      :title="dlgInfo.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="dlgInfo.isShow"
      :before-close="handleClose"
    >
      <el-form :rules="rules" :model="specs" label-width="100px" ref="formRef">
        <el-form-item prop="specsname" label="规格名称：">
          <el-input v-model="specs.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(item, index) in attrArr"
          :key="index"
          label="规格属性"
        >
          <el-input
            v-model="item.value"
            autocomplete="off"
            class="inptClass"
          ></el-input>
          <el-button v-if="index === 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button @click="delAttr(index)" v-else type="danger"
            >删除</el-button
          >
        </el-form-item>

        <el-form-item label="状态：">
          <el-switch
            v-model="specs.status"
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
        <el-button v-if="dlgInfo.isAdd" type="primary" @click="addSpecs"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editSpecs">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  axiosAddSpecs,
  axiosSearchOneSpecs,
  axiosEditSpecs,
} from "@/util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["dlgInfo"],
  data() {
    return {
      specs: {
        specsname: "",
        attrs: [],
        status: 1,
      },
      attrArr: [
        {
          value: "",
        },
      ],
      rules: {
        specsname: [
          { required: true, message: "请输入分类名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // this.getRoleList();
  },
  methods: {
    ...mapActions({
      getSpecsList: "specs/getSpecsListAction",
      getSpecsListCount: "specs/getSpecsListCountAction",
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
    addSpecs() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按照要求填写数据！");
        }
        let newArry = this.attrArr.filter((item) => item.value.trim() != "");
        this.specs.attrs = newArry.map((item) => item.value.trim()).join(",");
        axiosAddSpecs(this.specs).then((res) => {
          console.log(res.data);
          if (res.data.code !== 200) {
            this.$refs.formRef.resetFields();
            return this.$message.error(res.data.msg);
          }
          this.getSpecsList();
          this.getSpecsListCount();

          this.$message.success("添加成功！");
          this.cancel();
        });
      });
    },
    editSpecs() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) {
          return this.$message.info("请完确认信息符合要求！");
        }
        let newArry = this.attrArr.filter((item) => item.value.trim() != "");
        this.specs.attrs = newArry.map((item) => item.value.trim()).join(",");
        axiosEditSpecs(this.specs).then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg);
          }
          this.getSpecsList();
          this.$message.success("修改角色信息成功！");
          this.cancel();
        });
      });
    },
    seachOneSpecs(id) {
      axiosSearchOneSpecs(id)
        .then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error("规格信息获取失败！");
          }
          console.log(res);
          this.specs = res.data.list[0];
          this.specs.id = id;
          this.attrArr = [];
          this.specs.attrs.forEach((item, index) => {
            // if(index === 0){
            //   this.attrArr[0].value = item
            // }else{
            this.attrArr.push({
              value: item,
            });
            // }
          });
        })
        .catch((err) => {
          return this.$message.error("服务器错误，角色信息获取失败！");
        });
    },
    cancel() {
      this.$emit("cancel");
      this.$refs.formRef.resetFields();
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    handleClose() {
      this.cancel();
    },
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
    }),
  },
};
</script>

<style  lang="" scoped>
.inptClass {
  width: 50%;
}
</style>
