var provider = new firebase.auth.GoogleAuthProvider();
//make the user variable global
var user;
var selectedFile;

$(document).ready(function(){
    $('#welcome').hide();
    $('#uploadButton').hide();
    $('.upload-group').hide();
});

function signIn(){
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        showWelcomeContainer();

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function showWelcomeContainer(){
    $('#login').hide();
    $('#welcome').show();
    $('.upload-group').show();
    $('#welcomeText').html('Hello, ' + user.displayName);
}

$(".dropdown").on("hide.bs.dropdown", function (event) {
    var text = $(event.relatedTarget).text(); // Get the text of the element
    firebase.database().ref('Users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        favDog: text,
        myLove: 'Teemah'
    });
});

$('#upload').on('change', function(){
    selectedFile = event.target.files[0];
    $('#uploadButton').show();
});

function uploadFile(){
    // Create a reference to selected file
    var fileName = selectedFile.name;

    // Create a root reference
    var storageRef = firebase.storage().ref('/images/' + fileName);

    // // Create a reference to selected file
    // var fileName = selectedFile.name;

    // // Create a reference to 'images/filename'
    // var fileRef = storageRef.child(fileName);

    //To upload the file
    var uploadTask = storageRef.put(selectedFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        console.log(snapshot)
    }, function (error) {
        console.log(error)
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;

        console.log(downloadURL);
    });
}