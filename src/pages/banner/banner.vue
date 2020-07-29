<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
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
        title: "轮播图添加",
        show: false,
        isAdd: true,
      },
    };
  },
  computed: {},
  components: {
    vAdd,
    vList,
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.title = "轮播图添加";
      this.info.isAdd = true;
    },
    //点击了编辑
    edit(id) {
      this.info.show = true;
      this.info.title = "轮播图编辑";
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