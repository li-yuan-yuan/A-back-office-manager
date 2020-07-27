<template>
  <div class="bg">
    <div class="con">
      <h3>登录</h3>
      <el-input placeholder="请输入用户名" v-model="user.username" clearable class="input"></el-input>
      <el-input placeholder="请输入密码" v-model="user.password" show-password class="input"></el-input>
      <el-button type="primary" class="log" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
import {reqLogin} from "../../util/request"
import {successAlter,warningAlter} from "../../util/alter"
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {},
  components: {},
  methods: {
    login(){
      reqLogin(this.user).then(res=>{
        this.$router.push("/")
      })
    }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #543444, #2f3d5f);
}
.con {
  width: 360px;
  padding: 20px 80px 50px 80px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
h3 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}
.input {
  margin-bottom: 20px;
}
.log {
  width: 100%;
}
</style>