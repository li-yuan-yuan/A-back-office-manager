<template>
  <div>
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
        title: "会员修改",
      },
    };
  },
  computed: {},
  components: {
    vAdd,
    vList,
  },
  methods: {
    edit(id) {
      this.info.show = true;
      this.$refs.add.getDetail(id);
    }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
</style>