    var Erreur = Vue.component("Erreur", {
      template: ``,
      created: function() {
        var erreur = "../../404.html";
        window.location.href = erreur;
    }
    });