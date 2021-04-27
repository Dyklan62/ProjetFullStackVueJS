var Details = Vue.component("Details", {
    template: `
    <div>
    <a class="noborderalink">
      <router-link class="nav-link noborderalink" to="/">
        <img src="/img/Home.png" alt="">
      </router-link>
    </a>
      <h1 class="text-center">{{Pokemon[0].Nom}} EN DETAIL: </h1>
      <div class="text-center centercustom box-part container">
                  <div  class="col-lg-12 col-md-12 col-sm-12 col-xs-12 SpaceAround  text-center center-block">
                    <table class="table">
                        <thead>
                            <tr>
                            <th><img class='pokemonImage ImageRounded SpaceBottom' :src="Pokemon[0].Image"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Etape d'évolution : {{Pokemon[0].EvolutionStep}}</td>
                            </tr>
                            <tr class="table-primary">
                            <td>Type : {{Pokemon[0].Type}}</td>
                            </tr>
                            <tr class="table-secondary">
                            <td>Faible contre : {{Pokemon[0].TypeInfo[0].Faible}}</td>
                            </tr>
                            <tr class="table-warning">
                            <td>Fort contre : {{Pokemon[0].TypeInfo[0].Forces}}</td>
                            </tr>
                            <tr>
                            <td v-if='Pokemon[0].TypeInfo[0].Immunite != ""'>immunisé  contre : {{Pokemon[0].TypeInfo[0].Immunite}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
      </div>
    </div>`,
    props:{
        IdPokemon: String,
    }
    ,
    data() {
      return {
        Loged: isToken(),
        token: getToken(),
        user: getId(),
        result_message: null,
        Pokemon: null,
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
        alert("vous avez été déconnecté, votre session a expiré, veuillez vous reconnecter");
        this.$router.go();
        };
    });
        if(this.Loged){
              await axios({
                method: "put",
                url: "api/pokemon/details/findById",
                headers: {
                  Authorization: `Bearer ${this.token} ${this.user}`,
                },
                data: {
                    IdPokemon : this.IdPokemon,
                  },
              })
              .then((response) => {
                this.Pokemon = response.data.result;
                if(this.Pokemon[0].EvolutionStep == 'non')
                {
                this.Pokemon[0].EvolutionStep = 'unique, Il n\'y a pas d\'évolution'
                }
              })
              .catch((error) => {
                if(error.response.status == 401 && (error.response.data == 'Invalid user ID' || error.response.data == 'Token invalid' )){
                  clearToken();
                  alert("vous avez été déconnecté, votre session a expiré, veuillez vous reconnecter");
                  this.$router.go();
                  };
                //!gestion erreur
                alert("Le pokemon n'a pas pu etre récupéré");
              });
        };
    },
  });
  