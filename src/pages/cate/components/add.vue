<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder>
            <el-option label="===请选择===" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
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
import {
  reqCateAdd,
  reqCateDetail,
  reqCateUpdata,
} from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  props: ["info"],
  data() {
    return {
      //上传完成的时候图片的地址
      imageUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  components: {},
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
    }),
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
    // //自己的上传文件
    // changeImg2(e){
    //   var file = e.target.files[0];
    //  //上传的文件不能超过2M
    //   if (file.size > 2 * 1024 * 1024) {
    //     warningAlert("上传的图片不能超过2M");
    //     return;
    //   }
    //   //上传的文件后缀必须是.png .jpg .gif .jpeg
    //   var extname = file.name.slice(file.name.lastIndexOf("."));
    //   var extArr = [".png", ".jpg", ".gif", ".jpeg"];
    //   if (!extArr.some((item) => item === extname)) {
    //     warningAlert("上传文件必须是图片");
    //     return;
    //   }

    //   //生成一个URL地址，赋值给imageUrl,展示出来
    //   this.imageUrl = URL.createObjectURL(file);
    //   this.form.img = file;
    // },
    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //清空
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    //添加
    add() {
      reqCateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.empty();
          this.cancel();
          //再次请求list数据
          this.reqCateList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
    //获取一条数据
    getDetail(id) {
      reqCateDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
        
      });
    },
    //修改
    update() {
      reqCateUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.empty();
          this.cancel();
          this.reqCateList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
  },
  mounted() {},
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