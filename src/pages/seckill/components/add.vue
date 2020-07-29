<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="form.first_cateid" placeholder @change="changeFirstCateId()">
            <el-option label="===请选择===" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="form.second_cateid" placeholder @change="changeSecondCateId()">
            <el-option label="===请选择===" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="120px">
          <el-select v-model="form.goodsid" placeholder>
            <el-option label="===请选择===" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in thirdCateArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>

        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
import {
  reqSeckillAdd,
  reqGoodsList,
  reqSeckillUpdata,
  reqSeckillDetail,
} from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  props: ["info"],
  data() {
    return {
      editor: null,
      //二级分类属性
      secondCateArr: [],
      //三级分类属性
      thirdCateArr: [],
      //上传完成的时候图片的地址
      imageUrl: "",
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },

      //2000, 10, 10, 10, 10
      value1: [new Date(), new Date()],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList: "spec/list",
    }),
  },
  components: {},
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecList: "spec/reqList",
      reqGoodsList: "goods/reqList",
      reqSeckillList: "seckill/reqList",
    }),
    //修改了一级分类
    changeFirstCateId(bool) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;

      if (!bool) {
        this.form.second_cateid = "";
      }
    },
    //修改了二级分类
    changeSecondCateId(bool) {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.thirdCateArr = res.data.list;
      });
      if (!bool) {
        this.form.goodsid = "";
      }
    },
    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //清空
    empty() {
      //提交给后台的数据
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      //图片地址
      this.imageUrl = "";
      //二级分类属性
      this.secondCateArr = [];
      //三级分类属性
      this.thirdCateArr = [];
      this.value1 = [new Date(), new Date()];
    },
    //添加
    add() {
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      reqSeckillAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.empty();
          this.cancel();
          //再次请求list数据
          this.reqSeckillList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      reqSeckillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.value1 = [
          new Date(res.data.list.begintime * 1),
          new Date(res.data.list.endtime * 1),
        ];
        //根据一级分类计算出二级分类数组
        this.changeFirstCateId(true);
        //根据二级分类计算出三级分类数组
        this.changeSecondCateId(true);
      });
    },
    //修改
    update() {
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      reqSeckillUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.empty();
          this.cancel();
          this.reqSeckillList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqSpecList(true);
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    this.reqGoodsList();
  },
  beforeDestroy() {},
};
</script>
<style scoped>
</style>