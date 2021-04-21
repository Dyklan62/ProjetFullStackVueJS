
const token = getToken();
var response;
var url = document.location.href; 
var queue_url = url.substring (url.lastIndexOf( "/" )+1 );

async function isAuth() {
    try {
        const response = await axios.get('/authorization',{ headers: {"Authorization" : `Bearer ${token}`} });
        console.log(queue_url);
        if(queue_url != ''){
            window.location = "/";
        }
    } catch (error) {
        if(queue_url != 'login'){
            window.location = "/login";
        }
    }
};
window.onload = IsAuth;
