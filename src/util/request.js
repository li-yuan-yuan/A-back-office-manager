import axios from "axios";
import qs from "qs";

// 开发模式
const baseUrl = "/api";
// 生产模式
// const baseUrl="";



//响应拦截
axios.interceptors.response.use(res => {
    console.group("本次路径：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res;
})
//菜单添加
export const reqMenuAdd = (params) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: "post",
        data: qs.stringify(params)
    })
}
//菜单列表
export const reqMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: 'get',
        params
    })
}
//菜单 获取一条数据
export const reqMenuDetail = params => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'get',
        params
    })
}
//菜单 修改数据
export const reqMenuUpdata = params => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: 'post',
        data: qs.stringify(params)
    })
}
//菜单 删除一条数据reqMenuDel
export const reqMenuDel = params => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: 'post',
        data: qs.stringify(params)
    })
}





//角色管理
//角色添加
export const reqRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}
//角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: 'get',

    })
}
//角色 获取一条数据
export const reqRoleDetail = params => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: 'get',
        params
    })
}
//角色 修改数据
export const reqRoleUpdata = params => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: 'post',
        data: qs.stringify(params)
    })
}
//角色 删除一条数据reqRoleDel
export const reqRoleDel = params => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: 'post',
        data: qs.stringify(params)
    })
}



//管理员管理

//管理员添加
export const reqManageAdd = params => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}
//管理员总数 用于分页计算
export const reqManageSum = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"
    })
}
//管理员列表 分页
export const reqManageList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params
    })
}
//管理员获取uid
export const reqManageDetail = params => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params
    })
}
//管理员修改
export const reqManageUpdate = params => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(params)
    })
}
//管理员删除
export const reqManageDel = params => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
//管理员登录
export const reqLogin = params => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}

//商品分类添加
export const reqCateAdd = params => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: formData
    })
}
//商品分类列表
export const reqCateList = params => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params
    })
}
//商品分类详情
export const reqCateDetail= params => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params
    })
}
//商品分类修改
export const reqCateUpdata= params => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data:formData
    })
}
//商品分类删除
export const reqCateDel= params => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data:qs.stringify(params)
    })
}


//商品规格添加
export const reqSpecAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//商品规格总数
export const reqSpecCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get"
    })
}
//商品规格列表
export const reqSpecList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}

//商品规格某一个条数据
export const reqSpecDetail = params => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params
    })
}
//商品规格修改
export const reqSpecUpdate = params => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}

//商品规格删除
export const reqSpecDelete = params => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}


// =====================================商品=============================
//商品添加
export const reqGoodsAdd = (params) => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    // console.log(formData)
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: formData
    })

}

//商品总数
export const reqGoodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
    })
}
//商品列表
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

//商品某一个条数据
export const reqGoodsDetail = params => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params
    })
}
//商品修改
export const reqGoodsUpdata = params => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: formData
    })
}

//商品删除
export const reqGoodsDel = params => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}



// =====================================会员=============================

//会员列表
export const reqMemberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get"        
    })
}
//会员获取一条
export const reqMemberInfo = (params) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get" ,
        params
    })
}
//会员修改
export const reqMemberUpdata = (params) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post" ,
        data:qs.stringify(params)
    })
}

