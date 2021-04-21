    var Disconnect = Vue.component("Disconnect", {
      template: ``,
      created: function() {
        clearToken()
        alert("Vous etes déconnecté !");
        this.$router.push("/");
        this.$router.go(0)
    }
    });