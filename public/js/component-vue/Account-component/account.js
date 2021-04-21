var Account = Vue.component("Account", {
    template:  `
    <div>
        <a class="noborderalink" href="/"><img src="/img/Home.png" alt=""></a>
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
              <h5 class="bd-highlight text-wrap">Gestion du compte</h5>
              <p class="lead">
                Email : {{Email}}
              </p>
              <p class="lead">
                Pseudo : {{Pseudo}}
              </p>
                            <div>
                              <div class="d-flex justify-content-center mt-3 login_container">
                                <a class="noborderalink" href="/changeMdp"><button type="button" name="button" class="btn login_btn">Changer mon mot de passe</button></a>
                              </div>
                              <div class="d-flex justify-content-center mt-3 login_container">
                                <a class="noborderalink" href="/changeEmail"><button type="button" name="button" class="btn login_btn">Changer mon Email</button></a>
                              </div>
                              <div class="d-flex justify-content-center mt-3 login_container">
                                <a class="noborderalink" href="/changePseudo"><button type="button" name="button" class="btn login_btn">Changer mon Pseudo</button></a>
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
        Email : null ,
        Pseudo: null,
      };
    },
    async mounted() {
        var user = getId();
        try {
          var token = getToken();
            const response = await axios({
                method: 'put',
                url: 'api/user/Account',
                headers: {
                  Authorization: `Bearer ${token} ${user}`,
                },
                data: {
                    userID : user, 
                }
            });
            this.Email = response.data.Email;
            this.Pseudo = response.data.Pseudo;
            
        } catch (error) {
            this.Email = 'failed to get Email'
            console.error(error);
        }
      },
});