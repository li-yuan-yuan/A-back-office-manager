<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
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

        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder>
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

        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px" v-if="form.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="form.specsid" placeholder @change="changeSpec()">
            <el-option label="===请选择===" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px">
          <el-select v-model="form.specsattr" placeholder multiple>
            <el-option label="===请选择===" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="120px">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="120px">
          <div id="desc"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>

        <el-button type="primary" @click="update('form')" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
import {
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdata,
} from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  props: ["info"],
  data() {
    return {
      editor: null,
      //商品规格属性
      attrsArr: [],
      //二级分类属性
      secondCateArr: [],
      //上传完成的时候图片的地址
      imageUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //表单验证
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "change" },
        ],
      },
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
      reqGoodsTotal: "goods/reqTotal",
    }),
    //创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
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
    //修改了商品规格
    changeSpec(bool) {
      let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.attrsArr = this.specList[index].attrs;
      if (!bool) {
        this.form.specsattr = [];
      }
    },
    //修改了图片
    changeImg(e) {
      //上传的文件不能超过2M
      if (e.size > 2 * 1024 * 1024) {
        warningAlter("上传的图片不能超过2M");
        return;
      }
      //上传的文件后缀必须是.png .jpg .gif .jpeg
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var exArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!exArr.some((item) => item === extname)) {
        warningAlter("上传的必须是图片");
        return;
      }
      //file是上传的文件
      var file = e.raw;
      //生产一个URL地址，赋值给imageUrl,展示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
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
      //二级分类的数组
      this.secondCateArr = [];
      //商品规格属性值
      this.attrsArr = [];
      //提交给后台的数据
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      //图片地址
      this.imageUrl = "";
      //富文本置空
      this.editor.txt.html("");
    },
    //添加
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.specsattr = JSON.stringify(this.form.specsattr);
          this.form.description = this.editor.txt.html();
          console.log(this.form);
          reqGoodsAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlter(res.data.msg);
              this.empty();
              this.cancel();
              //再次请求list数据
              this.reqGoodsList();
              this.reqGoodsTotal();
            } else {
              warningAlter(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      reqGoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
        //根据一级分类计算出二级分类数组
        this.changeFirstCateId(true);
        //根据商品规格计算出商品属性
        this.changeSpec(true);
        this.form.specsattr = JSON.parse(this.form.specsattr);
      });
    },
    //修改
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.description = this.editor.txt.html();
          this.form.specsattr = JSON.stringify(this.form.specsattr);
          reqGoodsUpdata(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlter(res.data.msg);
              this.empty();
              this.cancel();
              this.reqGoodsList();
            } else {
              warningAlter(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.reqSpecList(true);
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
  },
  beforeDestroy() {},
};
</script>
<style scoped lang="stylus">
.add >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>