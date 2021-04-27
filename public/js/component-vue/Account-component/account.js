var Account = Vue.component("Account", {
  template: `
    <div>
        <a class="noborderalink" href="/">
          <router-link class="nav-link noborderalink" to="/">
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
            <div class="text-center d-flex justify-content-center form_container">
              <form>
              <h5 class="bd-highlight text-wrap">Gestion du compte</h5>
              <p class="lead">
                Email : {{Email}}
              </p>
              <p class="lead">
                Pseudo : {{Pseudo}}
              </p>
              <div>
                  <div class="d-flex justify-content-center mt-3 login_container">
                    <a class="noborderalink">
                      <router-link class="nav-link noborderalink" to="/changeMdp">
                        <button type="button" name="button" class="btn login_btn">Changer mon mot de passe</button>
                      </router-link>
                    </a>
                    </div>
                    <div class="d-flex justify-content-center mt-3 login_container">
                      <a class="noborderalink">
                      <router-link class="nav-link noborderalink" to="/changeEmail">
                        <button type="button" name="button" class="btn login_btn">Changer mon Email</button>
                      </router-link>
                      </a>
                    </div>
                    <div class="d-flex justify-content-center mt-3 login_container">
                      <a class="noborderalink">
                        <router-link class="nav-link noborderalink" to="/changePseudo">
                          <button type="button" name="button" class="btn login_btn">Changer mon Pseudo</button>
                        </router-link>
                      </a>
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
      Email: null,
      Pseudo: null,
    };
  },
  async mounted() {
    await axios({
      method: "put",
      url: "api/user/Account",
      headers: {
        Authorization: `Bearer ${this.token} ${this.user}`,
      },
      data: {
        userID: this.user,
      },
    })
      .then((response) => {
        this.Email = response.data.Email;
        this.Pseudo = response.data.Pseudo;
      })
      .catch((error) => {
        if (
          error.response.status == 401 &&
          (error.response.data == "Invalid user ID" ||
            error.response.data == "Token invalid")
        ) {
          clearToken();
          swal("","vous avez été déconnecté, votre session a expiré, veuillez vous reconnecter","error")
          .then(() => {
            this.$router.go();
          });
        }
      });
  },
});
