<template>
  <div>
    <el-table :data="memberList" style="width: 100%;margin-bottom: 20px;" row-key="id" border>
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters,mapActions} from "vuex"
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  data() {
    return {
      memberArr: [],
    };
  },
  computed: {
      ...mapGetters({
          memberList:"member/list"
      })
  },
  components: {},
  methods: {
      ...mapActions({
          reqMemberList:"member/reqList"
      }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqMemberList()
  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>