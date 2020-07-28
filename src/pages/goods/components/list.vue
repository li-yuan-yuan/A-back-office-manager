<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号" width="80"></el-table-column>
      <el-table-column prop="secondcatename" label="商品名称" width="80"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="80"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="80"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
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
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="size"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  components: {},
  methods: {
    //分页
    cPage(a) {
      this.changPage(a), this.reqGoodsList();
    },
    //获取数据
    ...mapActions({
      reqGoodsList: "goods/reqList",
      reqGoodsTotal: "goods/reqTotal",
      changPage: "goods/changePage",
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqGoodsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.reqGoodsTotal();
          this.reqGoodsList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqGoodsList();
    this.reqGoodsTotal();
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