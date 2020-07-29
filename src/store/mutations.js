export const state = {
    user: sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):null
}

export const mutations = {
    changeUser(state, user) {
        state.user = user;
        //临时存储，不关闭页面 用户信息存在
        sessionStorage.setItem("user",JSON.stringify(state.user))
    }
}

export const getters = {
    user(state) {
        return state.user
    }
}
