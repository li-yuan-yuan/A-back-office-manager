<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" width="120"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="name" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="name" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlter, warningAlter } from "../../../util/alter";
import { reqMenuDel } from "../../../util/request";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  components: {},
  methods: {
    ...mapActions({
      reqList: "menu/reqList",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqMenuDel({ id: id }).then((res) => {
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
</style>