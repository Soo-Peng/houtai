<template>
  <div>
    <!-- 弹框内容 -->
    <!-- el-dialog 
    visible	是否显示 Dialog，支持 .sync 修饰符 -->
    <el-dialog
      :title="addInfo.isAdd ? '添加秒杀' : '编辑秒杀'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
    >
      <el-form :rules="rules" ref="seckRef" :model="seck" label-width="120px">
        <el-form-item prop="title" label="活动名称：">
          <el-input v-model="seck.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限：" size="normal">
          <el-date-picker
            v-model="DateTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类：" prop="first_cateid">
          <el-select v-model="seck.first_cateid" placeholder="请选择">
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
          <el-select v-model="seck.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in SecondCateid"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品：" prop="goodsid">
          <el-select v-model="seck.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodListCheck"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态：">
          <el-switch
            v-model="seck.status"
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
        <el-button v-if="addInfo.isAdd" type="primary" @click="addSeck"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="editSeck">编辑</el-button>
      </div>

      <!-- {{this.seck}} -->
    </el-dialog>
  </div>
</template>

<script>
import {
  axiosGetGoodsList,
  axiosAddSeck,
  axiosSearchOneSeck,
  axiosEditSeck,
} from "@/util/axios";
import { indexRouter } from "@/router/index";

import { mapActions, mapGetters } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      //菜单添加表单
      seck: {
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
    this.getSortList();
    axiosGetGoodsList({
      page: 1,
      size: 999,
    })
      .then((res) => {
        if (res.data.code != 200) {
          return this.$message.error("获取数据失败！");
        }
        this.goodList = res.data.list;
      })
      .catch((err) => {
        this.$message.error("获取数据错误");
      });
  },
  methods: {
    ...mapActions({
      getSeckList: "seck/getSeckListAction",
      getSortList: "sort/getSortListAction",
    }),
    addSeck() {
      this.$refs.seckRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按格式填写数据！");
        }
        this.seck.begintime = new Date(this.DateTime[0]).getTime();
        this.seck.endtime = new Date(this.DateTime[1]).getTime();
        console.log(this.seck);
        axiosAddSeck(this.seck).then((res) => {
          if (res.data.code !== 200) {
            this.$refs.seckRef.resetFields();
            return this.$message.error(res.data.msg);
          }
          this.getSeckList();
          this.$message.success("添加成功！");
          this.cancel();
        });
      });
    },
    editSeck() {
      this.$refs.seckRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请按格式填写数据！");
        }
        this.seck.begintime = new Date(this.DateTime[0]).getTime();
        this.seck.endtime = new Date(this.DateTime[1]).getTime();
        console.log(this.seck);
        axiosEditSeck(this.seck).then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error(res.data.msg);
          }
          this.getSeckList();
          this.$message.success("修改成功！");
          this.cancel();
        });
      });
    },

    searchOne(id) {
      axiosSearchOneSeck(id)
        .then((res) => {
          if (res.data.code !== 200) {
            return this.$message.error("分类数据获取失败！");
          }
          this.seck = res.data.list;
          this.seck.id = id;
          let date1 = new Date(parseInt(this.seck.begintime));
          let date2 = new Date(parseInt(this.seck.endtime));
          this.DateTime = [date1, date2];
          // console.log(this.seck);
        })
        .catch((err) => {
          return this.$message.error("服务器错误，菜单数据获取失败！");
        });
    },
    cancel() {
      this.$emit("cancel", false);
      this.seck.status = 1;
      this.DateTime = [];
      this.$refs.seckRef.resetFields();
    },
  },
  computed: {
    ...mapGetters({
      sortList: "sort/getSortList",
    }),
    SecondCateid() {
      let idx = this.sortList.findIndex(
        (item) => item.id == this.seck.first_cateid
      );
      if (idx == -1) {
        return [];
      }
      return this.sortList[idx].children;
    },
    goodListCheck() {
      let goodlist = [];
      this.goodList.forEach((item) => {
        if (
          item.first_cateid == this.seck.first_cateid &&
          item.second_cateid == this.seck.second_cateid
        )
          goodlist.push(item);
      });
      console.log(goodlist);
      return goodlist;
    },
  },
};
</script>

<style lang="" scoped></style>
