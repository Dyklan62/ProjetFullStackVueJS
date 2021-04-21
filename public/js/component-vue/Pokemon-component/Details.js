var Details = Vue.component("Details", {
    template: `
    <div>
        <a class="noborderalink" href="/"><img src="/img/Home.png" alt=""></a>
      <div class="text-center centercustom box-part container">
        <h1>{{Pokemon[0].Nom}} en detail: </h1>
        <img class='pokemonImage ImageRounded SpaceBottom' :src="Pokemon[0].Image"/>
        <p>Type: {{Pokemon[0].Type}}</p>
        <p>Etape de l'evolution: {{Pokemon[0].EvolutionStep}}</p>
        <p>Type faible face à: {{Pokemon[0].TypeInfo[0].Faible}}</p>
        <p>Type fort face à: {{Pokemon[0].TypeInfo[0].Forces}}</p>
        <p v-if='Pokemon[0].TypeInfo[0].Immunite != ""'>Type immunisé face à:{{Pokemon[0].TypeInfo[0].Immunite}}</p>
      </div>
      <div  class="col-lg-12 col-md-12 col-sm-12 col-xs-12 SpaceAround  text-center center-block">
                    <table class="table">
                        <thead>
                            <tr class="thead">
                            <th class="thead">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Etape d'évolution : </td>
                            </tr>
                            <tr class="table-primary">
                            <td>Type : </td>
                            </tr>
                            <tr class="table-secondary">
                            <td>Faible contre : </td>
                            </tr>
                            <tr class="table-warning">
                            <td>Fort contre : </td>
                            </tr>
                            <tr>
                            <td v-if='CompareList[0].TypeInfo[0].Immunite != "" || CompareList[1].TypeInfo[0].Immunite != ""'>immunisé  contre : </td>
                            </tr>
                        </tbody>
                    </table>
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
        console.log(this.IdPokemon);
        if(this.Loged){
            try {
              const response = await axios({
                method: "put",
                url: "api/pokemon/details/findById",
                headers: {
                  Authorization: `Bearer ${this.token} ${this.user}`,
                },
                data: {
                    IdPokemon : this.IdPokemon,
                  },
              });
              this.Pokemon = response.data.result;
              if(this.Pokemon[0].EvolutionStep == 'non')
              {
                this.Pokemon[0].EvolutionStep = 'unique, Il n\'y a pas d\'évolution'
              }
              console.log(this.Pokemon);
            } catch (error) {
              this.Fail = "fail serveur";
              alert("Le pokemon n'a pas pu etre récupéré");
              console.error(error);
            };
          };
    },
  });
  