var ChangeEmail = Vue.component("ChangeEmail", {
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
              <h5 class="bd-highlight text-wrap">Changment d'email</h5>
                            <div">
                                <div class="input-group mb-2">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fas fa-key">Nouvelle adresse mail</i></span>
                                    </div>
                                    <input v-model="Email" type="Email" name="Email" class="form-control input_pass"  value="" placeholder="Email">
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
        Email: null,
      };
    },
    methods: {
        async update() {
              try {
                if (confirm("Etes vous sûr de vouloir changer votre Email ?")) {
                  var user = getId();
                  var token = getToken();
                    const response = await axios({
                        method: 'put',
                        url: 'api/user/update/Email',
                        headers: {
                          Authorization: `Bearer ${token} ${user}`,
                        },
                        data: {
                            userId : user,
                            Email: this.Email,
                        }
                    });
                    if(response.status == 200){
                        alert("Email changé");
                        this.$router.push("/Account");
                        this.$router.go(0);
                    }
                } else {
                  alert("Email inchangé , vous avez refusé");
                }
              } catch (error) {
                console.log(error);
              }
          }
    }
});