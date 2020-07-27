import {reqManageList,reqManageSum} from "../../util/request"
const state={
   list:[] ,
   //数据总量
   total:0,
   //一页的数量
   size:2,
   //当前的页码
   page:1

}

const mutations={
    //修改list
    changeList(state,arr){
        state.list=arr;
    },
    //修改总数
    changeTotal(state,num){
        state.total=num;
    },
    //修改当前的页码
    changePage(state,page){
        state.page=page
    }
}

const actions={
    //获取列表数据
    reqList(context){
        const params={
            page:context.state.page,
            size:context.state.size
        }
        reqManageList(params).then(res=>{
            context.commit("changeList",res.data.list)
        })
    },
    //获取总的数量
    reqTotal(context){
        reqManageSum().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },
    //修改当前的页码
    changePage(context,page){
        context.commit("changePage",page)
    }

}

const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}
export default {
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}