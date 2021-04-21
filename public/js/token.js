saveToken = (id,token) => {
    localStorage.setItem('user', JSON.stringify({Id: id,Token: token}));
};

getToken = () => {
    var currentUser = JSON.parse(localStorage.getItem('user'));
    if(currentUser){
        return currentUser.Token;
    }
    else{
        return null
    }
};

isToken = () => {
    return getToken() != null;
}

getId = () => {
    if(isToken()){
        return  JSON.parse(localStorage.getItem('user')).Id;
    }
    else{
        return null;
    }
}

clearToken = () => {
    return localStorage.removeItem('user');
}