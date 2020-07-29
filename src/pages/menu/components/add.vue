<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :label="item.title" :key="item.id" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="80px">
          <el-radio :label="1" v-model="form.type">目录</el-radio>
          <el-radio :label="2" v-model="form.type">菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="80px" v-else>
          <el-select v-model="form.url">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdata,
} from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      //图标集合
      icons: [
        "el-cion-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
        "/cate",
        "/spec",
        "/goods",
        "/banner",
        "/seckill",
        "/member"
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
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
    //重置内容
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    add() {
      // if(!this.info.isAdd){
      //   this.empty();
      // }
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          //重置form数据
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求list数据
          this.reqList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
    //获取某一条数据
    getDetail(id) {
      reqMenuDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    update() {
      reqMenuUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          // this.empty();
          this.cancel();
          this.reqList();
        }else{
            warningAlter(res.data.msg)
        }
      });
    }
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
</style>