$(document).ready(function(){
    alert('ready');
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var user = firebase.auth().currentUser;
            var token = user.uid;
            queryDatabase(token);
        } else {
            window.location = 'index.html';
        }
    });
});

function queryDatabase(token){
    firebase.database().ref('/Posts/').once('value').then(function (snapshot) {
        var posts = snapshot.val();
        console.log(posts);
        var objKeys = Object.keys(posts);
        for(var i = 0; i < objKeys.length; i++){
            console.log(objKeys[i]);
        }
    });
}