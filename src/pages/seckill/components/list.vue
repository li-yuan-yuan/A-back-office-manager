<template>
  <div>
    <el-table :data="seckillList" style="width: 100%;margin-bottom: 20px;" row-key="id" border>
      <el-table-column prop="title" label="活动名称" ></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn type="danger" @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSeckillDel } from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      seckillList: "seckill/list",
    }),
  },
  components: {},
  methods: {
    //获取数据
    ...mapActions({
      reqList: "seckill/reqList"
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqSeckillDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.reqList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqList();
  },
  beforeDestroy() {},
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>