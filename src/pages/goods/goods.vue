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
      //传递给子组件的信息
      info: {
        //弹框的出现状态
        show: false,
        title: "",
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
      this.info.title = "商品添加";
      this.info.isAdd = true;
    },
    edit(id) {
      this.info.show = true;
      this.info.title = "分类编辑";
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