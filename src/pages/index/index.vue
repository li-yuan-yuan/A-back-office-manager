<template>
  <div>
    <el-container class="index">
      <el-aside width="200px" class="left">
        <!-- //导航开始 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#20222A"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :unique-opened="true"
        >
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 有目录的循环 -->
          <!-- <el-submenu
            v-for="item in user.menus"
            :key="item.id"
            :index="item.id+''"
            v-show="hasChildren"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="i.url" v-for="i in item.children" :key="i.title">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <!-- 没有目录，只有菜单 -->
          <!-- <el-menu-item
            v-show="!hasChildren"
            :index="i.url"
            v-for="(i) in user.menus"
            :key="i.title"
          >
            <span slot="title">{{i.title}}</span>
          </el-menu-item>
         -->

        <!-- 可以自动判断有没有子目录 -->
        <template v-for="item in user.menus">
          <el-submenu
            :key="item.id"
            :index="item.id+''"
            v-if="item.children"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="i.url" v-for="i in item.children" :key="i.title">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item
            :index="item.url"
            :key="item.title"
            v-if="!item.children"
          >
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      

















</el-menu>
        <!-- //导航结束 -->
      </el-aside>
      <el-container>
        <el-header>
          <div class="userName">
            <span>{{user.username}}</span>
            <el-button type="primary" @click="exit()">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    //判断是否有目录
    hasChildren() {
      return this.user.menus[0].children ? true : false;
    },
  },
  components: {},
  methods: {
      ...mapActions({
      changeUser: "changeUser",
    }),
    //退出
    exit() {
      this.changeUser(null);
      this.$router.push("/login")
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
.index {
  height: 100vh;
}
.left {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.userName {
  float: right;
  line-height: 60px;
}
.view {
  padding-top: 20px;
}
</style>