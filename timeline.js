$(document).ready(function(){
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
        var owner = snapshot.val().username
        console.log(posts, owner);
    });
}