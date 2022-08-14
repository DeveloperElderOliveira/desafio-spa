<template>
  <section class="login">
    <h1>Login</h1>
    <form action="">
      <label for="name">Nome</label>
      <input type="name" name="name" id="name" v-model="login.name">
      <label for="senha">Senha</label>
      <input type="password" name="password" id="password" v-model="login.password">
      <button class="btn" v-if="!logando" @click.prevent="logar">Logar</button>
      <PaginaCarregando v-else/>
      <ErroNotificacao :erros="erros"/>
      
      
    </form>
  </section>
</template>

<script>


export default {
  name: 'LoginView',

  data(){
    return {
      logando: false,
      login: {
        name: "",
        password: ""
      },
      erros: []
    }
  },
  methods:{
    logar(){
      this.erros = [];
      this.logando = true; 
      this.$store.dispatch("logarUsuario", this.login).then(() => {    
        this.logando = false; 
        this.$router.push({name: "usuario"});
      }).catch(() => {
        this.erros.push("Usuário inválido!")
        this.logando = false; 
      });    
    }
  }
  
};
</script>

<style scoped>

.login{
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn{
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover{
  color: #87f;
  text-decoration: underline;
}
  
</style>
