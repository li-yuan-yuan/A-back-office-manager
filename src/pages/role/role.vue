<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加弹框 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  data() {
    return {
      info: {
        show: false,
        title: "",
      },
    };
  },
  computed: {},
  components: {
    vList,
    vAdd,
  },
  methods: {
    //点击了添加按钮
    add() {
      this.info.show = true;
      this.info.title = "添加角色";
      this.info.isAdd = true;
    },
    //点击了编辑按钮
    edit(id) {
        console.log(1);
      this.info.show = true;
      this.info.title = "编辑角色";
      this.info.isAdd = false;
      this.$refs.add.getDetail(id);
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
</style>