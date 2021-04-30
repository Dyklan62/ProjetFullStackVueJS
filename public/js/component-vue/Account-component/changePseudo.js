var ChangePseudo = Vue.component("ChangePseudo", {
    template: `
    <div>
      <a class="noborderalink">
        <router-link class="nav-link noborderalink" to="/Account">
          <img src="/img/Home.png" alt="">
        </router-link>
      </a>
        <div id="forgot" class="container h-75">
        <div class="d-flex justify-content-center h-100">
          <div class="user_card">
            <div class="d-flex justify-content-center"> 
              <div class="brand_logo_container">
                <img src="../img/Login_register_logo.png" class="brand_logo" alt="Logo">
              </div>
            </div>
            <div id="login" class="text-center d-flex justify-content-center form_container">
              <form>
              <h5 class="bd-highlight text-wrap">Changment de Pseudo</h5>
                            <div">
                                <div class="input-group mb-2">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-key">Nouveau pseudo</i></span>
                                    </div>
                                    <input v-model="Pseudo" type="" name="Pseudo" class="form-control input_pass"  value="" placeholder="Pseudo">
                                </div>

                                <div class="d-flex justify-content-center mt-3 login_container">
                                    <button type="button" name="button" class="btn login_btn"  @click="update()">continuer</button></a>
                                </div>
                            </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>`,
    data() {
      return {
        Loged: isToken(),
        token: getToken(),
        user: getId(),
        Pseudo: null,
      };
    },
    async mounted() {
      await axios({
          method: 'put',
          url: 'api/user/Auth',
          headers: {
            Authorization: `Bearer ${this.token} ${this.user}`,
          },
      })
      .catch((error) => {
        if(error.response.status == 401 && (error.response.data == 'Invalid user ID' || error.response.data == 'Token invalid' )){
          clearToken();
          swal("","vous avez été déconnecté, votre session a expiré, veuillez vous reconnecter","error")
          .then(() => {
            this.$router.go();
          });
          };
      });
    },
    methods: {
        async update() {
          await swal({
            title: "Etes vous sur?",
            text: "Etes vous sûr de vouloir changer votre pseudo ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((update) => {
            if(update){
                   axios({
                        method: 'put',
                        url: 'api/user/update/Pseudo',
                        headers: {
                          Authorization: `Bearer ${this.token} ${this.user}`,
                        },
                        data: {
                            userId : this.user,
                            Pseudo : this.Pseudo,
                        }
                    })
                    .then(() => {
                        swal("","Pseudo changé","success")
                        .then(() => {
                        this.$router.push("/Account");
                        this.$router.go(0);
                        });
                  })
                  .catch((error) => {
                    if(error.response.status == 401 && (error.response.data == 'Invalid user ID' || error.response.data == 'Token invalid' )){
                      clearToken();
                      swal("","vous avez été déconnecté, votre session a expiré, veuillez vous reconnecter","error")
                      .then(() => {
                        this.$router.go();
                      });
                      };
                    swal("","Pseudo inchangé, problème serveur","error");

                  });
                } else {
                  swal("","Pseudo inchangé , vous avez refusé","info");
          }
    });
  }
 }
});
