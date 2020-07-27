<template>
  <div>
    <el-table :data="manageList" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="name" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" @current-change="cPage" :page-size="size" :total="total"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageDel } from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      manageList: "manage/list",
      total:"manage/total",
      size:"manage/size"
    }),
  },
  components: {},
  methods: {
    //获取数据
    ...mapActions({
      reqManageList: "manage/reqList",
      reqTotal:"manage/reqTotal",
      changePage:"manage/changePage"
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqManageDel({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.reqManageList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
    //修改页码
    cPage(a){
        this.changePage(a)
        this.reqManageList()
    }
  },
  mounted() {
    this.reqManageList();
    this.reqTotal()
  },
  beforeDestroy() {},
};
</script>
<style scoped>
</style>