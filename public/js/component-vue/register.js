var Register = Vue.component("Register", {
    template: `
    <div>
      <a class="noborderalink" href="/"><img src="/img/Home.png" alt=""></a>
      <div id="register" class="centercustom container h-75">
      <div class="d-flex justify-content-center h-100">
        <div class="user_card">
          <div class="d-flex justify-content-center">
            <div class="brand_logo_container">
              <img src="../img/Login_register_logo.png" class="brand_logo" alt="Logo">
            </div>
          </div>
          <div class="d-flex justify-content-center form_container">
            <form>
            <h5 class="text-center bd-highlight text-wrap">Incription</h5>
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-user">Email</i></span>
                </div>
                <input v-model="Email" type="text" name="Email" class="form-control input_user" value="" placeholder="Email">
              </div>
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-key">Pseudo</i></span>
                </div>
                <input v-model="Pseudo" type="text" name="Pseudo" class="form-control input_user" value="" placeholder="Pseudo">
              </div>
              
              <div class="input-group mb-2">
                <div class="input-group-append">
                  <span class="input-group-text"><i class="fas fa-key">Mot de passe</i></span>
                </div>
                <input v-model="Mdp" type="password" name="Mot de passe" class="form-control input_pass" value="" placeholder="Mot de passe">
              </div>
                <div class="d-flex justify-content-center mt-3 login_container">
                  <button type="button" name="button" class="btn login_btn" @click="register()">Inscription</button>
                </div>
            </form>
          </div>
      
          <div class="mt-4">
            <div class="d-flex justify-content-center links">
              Déjà inscrit ? <a href="/login" class="ml-2">Connexion</a>
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
      Pseudo: null ,
    };
  },
   methods: {
      async register() {
        console.log(this.Mdp)
                await axios({
                    method: 'put',
                    url: 'api/user/register',
                    data: {
                        Email : this.Email, 
                        Mdp : md5(this.Mdp),
                        Pseudo: this.Pseudo ,
                    }
                })
                .then((response) => {
                  if(response.data.token){
                    alert("Vous etes inscrit !");
                    this.$router.push("/");
                    this.$router.go(0)
                  }
                })
                .catch((error) => {
                  if(error.response.status == 500){
                    alert("Aucun champ ne peut etre vide");
                  }
                  if(error.response.status == 401 && (error.response.data == 'Invalid user ID' || error.response.data == 'Token invalid' )){
                    clearToken();
                    alert("vous avez été déconnecté, votre session a expiré, veuillez vous reconnecter");
                    this.$router.go();
                    };
                    if(error.response.status == 409){
                      alert("vous étes deja inscrit ou votre Pseudo est deja utilisé");
                    }
                });
      }
    },
  });