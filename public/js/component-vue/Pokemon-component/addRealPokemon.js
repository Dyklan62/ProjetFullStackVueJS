var AddRealPokemon = Vue.component("AddRealPokemon", {
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
                  <div class="input-group mb-3">
                  <div class="input-group-append">
                      <span class="input-group-text"><i class="fas fa-user">Nom</i></span>
                  </div>
                  <select v-model="Pokemon">
                      <option v-for="nom in Noms" v-bind:value="nom">
                      {{ nom.name }}
                      </option>
                  </select>
                  </div>
  
                  <div class="d-flex justify-content-center mt-3 login_container">
                    <button type="button" name="button" class="btn login_btn" @click="AddPokemon()">Ajouter le pokemon</button>
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
        result_message: null,
        Pokemon:null,
        Id: null,
        Noms: [],
        Nom: null,
        Evolution: null,
        Type: null,
        Image: null,
      };
    },
    async mounted() {
      await axios({
        method: "get",
        url: "https://pokeapi.co/api/v2/pokemon?limit=1118",
      })
      .then((response) => {
        this.Noms=response.data.results;
      })
      .catch(() => {
        swal("","Erreur ,Pokemon non accessible","error")
        .then(() => {
        this.$router.go('/');
        });
      });
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
       async AddPokemon() {
          if (
            await swal({
            title: "Etes vous sur?",
            text: "Etes vous sûr de vouloir ajouter ce pokemon ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((Pokemon) => {
          if(Pokemon){return true}
          else{return false}})
          )
          {
                const response = await axios({
                  method: "get",
                  url: this.Pokemon.url,
                });
                
                this.Nom = response.data.name;
                this.Type = TypeTranslate(response.data.types[0].type.name);
                this.Image = response.data.sprites.front_default;
                var reponseId=response.data.id;

                const response2 = await axios({
                  method: "get",
                  url: `https://pokeapi.co/api/v2/pokemon-species/${reponseId}`,
                });

                if(response2.data.evolves_from_species == undefined){
                  this.Evolution =1;
                }else{
                  reponseId--;
                  await axios({
                    method: "get",
                    url: `https://pokeapi.co/api/v2/pokemon-species/${reponseId}`,
                  })
                  .then((response3) => {
                    if(response3.data.evolves_from_species == undefined ){
                      this.Evolution =2;
                    }
                    else{
                      this.Evolution=3;
                    }
                  })
                  .catch((error) => {
                      swal("","Erreur ,Evolution non accessible","error");
                  });
                }
                await axios({
                    method: 'post',
                    url: 'api/pokemon/add',
                    headers: {
                      Authorization: `Bearer ${this.token} ${this.user}`,
                    },
                    data: {
                      Nom : this.Nom,
                      Type : this.Type,
                      EvolutionStep : this.Evolution,
                      Image: this.Image,
                      userId: this.user,
                    }
                })
                .then(() => {
                  swal("","Pokemon ajouté","success")
                  .then(() => {
                    this.$router.push("/");
                    this.$router.go(0);
                  });
                })
                .catch((error) => {
                  if(error.response.status == 401 && (error.response.data == 'Invalid user ID' || error.response.data == 'Token invalid' )){
                    clearToken();
                    swal("","vous avez été déconnecté, votre session a expiré, veuillez vous reconnecter","success")
                    .then(() => {
                      this.$router.go(0);
                    });
                    };
                });
              } else {
                swal("","Le pokemon n'a pas été ajouté","error");
              }
      },
    },
  });
  