<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="120px" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMemberInfo, reqMemberUpdata } from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  props: ["info"],
  data() {
    return {
      //上传完成的时候图片的地址
      imageUrl: "",
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      //表单验证
      rules: {
        phone: [
          { required: true, message: "请输入正确的手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度11个字符", trigger: "change" },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" },
        ],
      },
    };
  },
  computed: {},
  components: {},
  methods: {
    ...mapActions({
      reqMemberList: "member/reqList",
    }),
    //取消
    cancel() {
      this.info.show = false;
      this.empty();
    },
    //清空
    empty() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
      this.imageUrl = "";
    },
    //获取一条数据
    getDetail(id) {
      reqMemberInfo({ uid: id }).then((res) => {
        console.log(res.data.list);
        this.form = res.data.list;
        // this.form.uid=res.data.list.uid;
      });
    },
    //修改
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqMemberUpdata(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlter(res.data.msg);
              this.empty();
              this.cancel();
              this.reqMemberList();
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
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped >
</style>