var Accueil = Vue.component("Accueil", {
    template: `
    <div class="Acceuil text-center">
        <section class="section titresection">
        <h1>DataDex, votre solution de trie pokemon !</h1>
        <a class="noborderalink" href="#sectionOne"><img class="alinkimage" src="/img/arrowDown.png" alt=""></a>
        </section>
        <section id="sectionOne" class="section sectiontrie">
              <div class="row align-items-start">
                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mx-auto">
                  <img class="HomeImg" src="/img/triePoke.png" alt="">
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mx-auto">
                  <div class="section">
                      <h2>Un sytème de trie de pokemon extra ordinaire</h2>
                      <h3>notre système de trie de pokemon se base tout d'abord sur un affichage en grille</h3>
                      <h4>tel des cartes pokemon , vous pouvez trier vos cartes , les copier ou encore les supprimer</h4>
                  </div>
                </div>
              </div>
        </section>
        <section class="section sectiontrie">
              <div class="row  align-items-start">
                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mx-auto">
                  <img class="HomeImg" src="/img/comparaisonPoke.png" alt="">
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mx-auto">
                  <div class="section">
                    <h2>Un tout nouveau sytème de comparaison !</h2>
                    <h3>notre système de comparaison de pokemon se base sur le type principale de vos deux poemon a comparer</h3>
                    <h4>pour ce faire nos algorithme calcul que pokemon a l'avatage par rapport a l'autre lors d'un combat et vous affiche le resultat simplement</h4>
                  </div>
                </div>
              </div>
        </section>
        <section class="section sectiontrie">
            <div class="row align-items-start">
              <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mx-auto">
                  <img class="HomeImg" src="/img/addPokeHome.png" alt="">
               </div>
               <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 mx-auto">
                <div class="section">
                  <h2>Un sytème d'ajout de pokemon Unique !</h2>
                  <h3>notre système de trie de pokemon se base tout d'abord sur l'ajout de vos pokemon a voter espace de gestion de pokemon</h3>
                  <h4>pour ce faire vous pouvez soit ajouter  votre pokemon dit "custom" soit ajouter un pokemon existant depuis nos bases</h4>
                </div>
              </div>
            </div>
    </div>
      `,
    data() {
      return {
        Loged: isToken(),
        token: getToken(),
      };
    },
  });
  