<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加弹框 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表 -->
    <v-list @edit='edit'></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  data() {
    return {
        //传递给子组件的信息
        info:{
            //弹框的状态
            show:false,
            title:"菜单添加",
            isAdd:true
        }
    };
  },
  computed: {},
  components: {
    vAdd,
    vList,
  },
  methods: {
      add(){
          this.info.show=true;
          this.info.isAdd=true;
          this.info.title="菜单添加"
      },
      edit(id){
          this.info.show=true;
          this.info.isAdd=false;
          this.info.title="菜单编辑"
          this.$refs.add.getDetail(id)
      },
      cancel(){
          this.info.show=false;
      }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
</style>