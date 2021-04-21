var ChangeMdp = Vue.component("ChangeMdp", {
    template: `
    <div>
        <a class="noborderalink" href="/Account"><img src="/img/Home.png" alt=""></a>
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
              <h5 class="bd-highlight text-wrap">Changment de mot de passe</h5>
                            <div id="space">
                                <div class="input-group mb-2">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-key">Ancien mot de passe</i></span>
                                    </div>
                                    <input v-model="OldMdp" type="password" name="OldMdp" class="form-control input_pass"  value="" placeholder="Ancien mot de passe">
                                </div>
                                <div class="input-group mb-2">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-key">Nouveau mot de passe</i></span>
                                    </div>
                                    <input v-model="Mdp" type="password" name="Mdp" class="form-control input_pass"  value="" placeholder="Mot de passe">
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
      IsEmailExist: false,
      Email: null,
      Mdp : null ,
      OldMdp : null,
    };
  },
   methods: {
      async update() {
        if(this.OldMdp && this.Mdp){
        var user = getId();
          try {
            if (confirm("Etes vous sûr de vouloir changer votre mot de passe ?")) {
              var token = getToken();
                const response = await axios({
                    method: 'put',
                    url: 'api/user/update/MDP',
                    headers: {
                      Authorization: `Bearer ${token} ${user}`,
                    },
                    data: {
                        userId : user,
                        OldMdp : md5(this.OldMdp),
                        Mdp : md5(this.Mdp),
                    }
                });
                this.result_message = response.status;
                if(response.status == 200){
                    alert("Mot de passe changé");
                    this.$router.push("/Account");
                    this.$router.go(0);
                }
            } else {
              alert("Mot de passe inchangé , vous avez refusé");
            }
          } catch (error) {
            console.log(error);
            if(error.code == 401){
            alert("Mot de passe inchangé , erreur ancien mot de passe");
            }

          }
        }
      }
    },
  });