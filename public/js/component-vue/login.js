var Login = Vue.component("Login", {
    template: `
    <div>
      <a class="noborderalink" href="/"><img src="/img/Home.png" alt=""></a>
      <div id="login" class="container h-75">
      <div class="d-flex justify-content-center h-100">
        <div class="user_card">
          <div class="d-flex justify-content-center"> 
            <div class="brand_logo_container">
              <img src="../img/Login_register_logo.png" class="brand_logo" alt="Logo">
            </div>
          </div>
          <div	id="login" class="d-flex justify-content-center form_container">
            <form>
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-user">Email</i></span>
                </div>
                <input v-model="Email" type="text" name="Email" class="form-control input_user" value="" placeholder="Email">
              </div>
              <div class="input-group mb-2">
                <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-key">Mot de passe</i></span>
                </div>
                <input v-model="Mdp" type="password" name="Mdp" class="form-control input_pass" value="" placeholder="Mdp">
              </div>
                <div class="d-flex justify-content-center mt-3 login_container">
                  <button type="button" name="button" class="btn login_btn" @click="login()">Se connecter</button>
                </div>
            </form>
          </div>
          <div class="mt-4">
            <div class="d-flex justify-content-center links">
              Nouveau ?<a href="/register" class="ml-2"> Inscription</a>
            </div>
            <div class="d-flex justify-content-center links">
              <a href="/forgetPassword">Mot de passe oublié ?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  data() {
    return {
        result_message: null,
        Email: null,
        Mdp: null ,
    };
  },
  methods: {
    async login() {
      try {
          const response = await axios({
              method: 'post',
              url: 'api/user/login',
              data: {
                  Email : this.Email, 
                  Mdp : md5(this.Mdp),
              }
          });
          this.result_message = response.status;
          if(response.data.token){
              saveToken(response.data.userId,response.data.token);
              var token = getToken();
              alert("Vous etes connecté !");
              this.$router.push("/");
              this.$router.go(0);
          }
      } catch (error) {
        if(error.message == 'Request failed with status code 422'){
          alert("connexion échoué , Email ou mot de passe invalide");
        }
          console.error(error);
      }
    },
  }
});