import Vue from "vue";
var vm=new Vue();

//成功弹框
export const successAlter=(msg)=>{
    vm.$message({
        message: msg,
        type: 'success'
    });
}

//警告弹框
export const warningAlter=(msg)=>{
    vm.$message({
        message: msg,
        type: 'warning'
    });
}
//错误弹框
export const errorAlter =(msg)=>{
    vm.$message.error(msg);
}