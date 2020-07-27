<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder>
            <el-option label="===请选择===" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageAdd,reqManageDetail ,reqManageUpdate} from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  components: {},
  methods: {
    ...mapActions({
      reqRoleList: "role/reqList",
      reqManageList:"manage/reqList"
    }),
    //取消
    cancel() {
        this.info.show=false;
        this.empty()
    },
    //清空
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //添加
    add() {
      reqManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.cancel();
          this.reqManageList()
        }else{
            warningAlter(res.data.msg)
        }
      });
    },
    //获取一条数据
    getDetail(id){
        reqManageDetail({uid:id}).then(res=>{
            this.form=res.data.list;
            this.form.password=""
        })
    }
    ,
    //修改
    update() {
        reqManageUpdate(this.form).then(res=>{
            if(res.data.code==200){
                successAlter(res.data.msg)
                this.empty()
                this.cancel()
                this.reqManageList()
            }else{
                warningAlter(res.data.msg)
            }
        })
    },
  },
  mounted() {
    this.reqRoleList();
  },
  beforeDestroy() {},
};
</script>
<style scoped>
</style>