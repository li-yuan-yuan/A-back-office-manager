<template>
 <div>
     <el-table
      :data="roleList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="角色编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column prop="name" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删 除</el-button> -->
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import {reqRoleDel} from "../../../util/request"
import { successAlter, warningAlter } from '../../../util/alter';
export default {
data() {
return {
};
},
computed: {
    ...mapGetters({
        roleList:"role/list"
    })
},
components: {
    
},
methods: {
    ...mapActions({
        reqRoleList:"role/reqList"
    }),
    //编辑
    edit(id){
        this.$emit("edit",id)
    },
    //删除
    del(id){
reqRoleDel({id:id}).then(res=>{
    if(res.data.code){
        successAlter(res.data.msg)
        this.reqRoleList();
    }else{
        warningAlter(res.data.msg)
    }
})
    }
},
mounted() {
    this.reqRoleList();
},
beforeDestroy() {}
};
</script>
<style scoped>
</style>