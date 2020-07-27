<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <!-- :default-checked-keys="[5]"选中 -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            ref="tree"
            :default-checked-keys="defaultKey"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="updata" v-else>确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdata,
} from "../../../util/request";
import { successAlter, warningAlter } from "../../../util/alter";
export default {
  props: ["info"],
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      formLabelWidth: "120px",
      defaultKey: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/list",
      roleList: "role/list",
    }),
  },
  components: {},
  methods: {
    ...mapActions({
      reqMenuList: "menu/reqList",
      reqRoleList: "role/reqList",
    }),
    //清空
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      }
      this.$refs.tree.setCheckedKeys([])

    },
    //添加
    add() {
      //获取tree的key赋值给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.empty()
          this.cancel();
          this.reqRoleList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //点击编辑获取一条数据
    getDetail(id) {
      reqRoleDetail({ id: id }).then((res) => {
        console.log(res);
        this.form = res.data.list;
        this.form.id = id;
        this.defaultKey = JSON.parse(res.data.list.menus);
      });
    },
    //修改
    updata() {
      //获取tree的key赋值给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdata(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlter(res.data.msg);
          this.empty();
          this.cancel();
          this.reqRoleList();
        } else {
          warningAlter(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.reqMenuList();
      this.reqRoleList();
    }
  },
  beforeDestroy() {},
};
</script>
<style scoped>
</style>