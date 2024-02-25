
const AppTemplate = `
<div class="content">

  <div class="login-page">
  <div class="form">
    <div class="login">
      <div class="login-header">
        <h3>Entrar Como Administrador</h3>
        <p>Por favor, Preencha Os Campos.</p>
      </div>
    </div>
    <form>
      <div class="form-group">
        <input type="text" class="form-control" id="Usuario" placeholder="Usuario: *" v-model='login.USUARIO'>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" id="Senha" placeholder="Senha: *" v-model='login.SENHA'>
      </div>
      <button @click.prevent="Login">Entrar</button>
    </form>
  </div>
  </div>

</div>

`;
Vue.component("AppVue", {
  template: AppTemplate,
  data() {
    return {
      login: {
        USUARIO: null,
        SENHA: null
      }
    }

  },
  methods: {
    Login(){
      console.log(this.login)
      if(this.login.USUARIO == "carlos" && this.login.SENHA == "123"){
        window.location.href = "http://localhost/ProcessoSeletivoDsin/CabeleleiraLeila/paginaAdm";
      }else{
        Swal.fire('Usuario/Senha Incorretos!!');
      }
    }
  },
  mounted: function(){
    
  }
});