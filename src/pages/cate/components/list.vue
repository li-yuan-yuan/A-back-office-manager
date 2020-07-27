<template>
  <div>
    <el-table :data="cateList" style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <del-btn type="danger" @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqCateDel } from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
   
    }),
  },
  components: {},
  methods: {
    //获取数据
    ...mapActions({
      reqCateList: "cate/reqList",
    
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqCateDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.reqCateList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.reqCateList();
   
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