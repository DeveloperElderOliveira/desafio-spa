import Vue from 'vue'
import Vuex from 'vuex'
import { api } from "@/services.js"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      name: "",
      email: "",
    },
    movimentacoes: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload){
      state.login = payload
    },
    UPDATE_USUARIO(state, payload){
      console.log(payload);
      state.usuario = Object.assign(state.usuario,payload);
    },
    UPDATE_MOVIMENTACOES(state, payload){
      state.movimentacoes = payload;
    },
  },
  actions: {
    getMovimentacoes(context) {
      api.get(`/get-movimentacoes`).then(response => {
        context.commit("UPDATE_MOVIMENTACOES", response.data.movimentacoes)
      });  
    },
    criarUsuario(context,payload) {
      return api.post("/usuario",payload);
    },
    logarUsuario(context,payload) {
      return api.login(
        {
          name: payload.name,
          password: payload.password
        }
      ).then(response => {
          context.commit("UPDATE_USUARIO", {id: response.data.user.id,name: response.data.user.name, email: response.data.user.email});
          context.commit("UPDATE_LOGIN", true);
          window.localStorage.token = `Bearer ${response.data.access_token}`;
      });
    },
    deslogarUsuario(context){   
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
      });
      context.commit("UPDATE_LOGIN",false);
      window.localStorage.token = '';
    },
  },
  
  modules: {
  }
})
