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
        var currentRow;
        for(var i = 0; i < objKeys.length; i++){
            var currentObject = posts[objKeys[i]]
            console.log(currentObject);

            if(i % 3 == 0){
                currentRow = document.createElement('div');
                $(currentRow).addClass('row');
                $('#contentHolder').append(currentRow);
            }
            var col = document.createElement('div');
            $(col).addClass('col-lg-4');
            var image = document.createElement('img');
            image.src = currentObject.url;
            $(image).addClass('contentImage');
            var p = document.createElement('p');
            $(p).html(currentObject.caption);
            $(p).addClass('contentCaption');
            $(col).append(image);
            $(col).append(p);
            $(currentRow).append(col);
        }
    });
}