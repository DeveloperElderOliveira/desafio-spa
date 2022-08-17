import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UsuarioView from '../views/usuario/UsuarioView.vue'
import UsuarioUploadFile from '../views/usuario/UsuarioUploadFile.vue'

Vue.use(Router)

const routes = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/usuario',
    component: UsuarioView,
    meta:{
      login: true
    },
    children: [
      {
        path: "",
        name: "usuario",
        component: UsuarioUploadFile
      }]
    }]   
  }
);


routes.beforeEach((to,from, next) => {
    if(to.matched.some(record => record.meta.login)) {
      console.log(window.localStorage.token);
      if(!window.localStorage.token) {
        next("/login")
      } else {
        next();
      }
    } else {
      next();
    }
  });

export default routes
