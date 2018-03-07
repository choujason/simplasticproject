initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      var logbtn = document.getElementById('logbtn');
        if (user) {
            // User is signed in.
            var uid = user.uid;
//            var logOutbutton = document.getElementById("logOut");
//            var logInbutton = document.getElementById("logIn");
            // log out function

            logbtn.textContent='登出';
            document.getElementById('sign-in').textContent = 'Hello, ' + user.displayName;

            logbtn.addEventListener('click', e => {
                firebase.auth().signOut();
                window.location.href = 'logOutpage.html';
            });

        } else {
            // User is signed out.
//            document.getElementById('logOut').remove();
//            document.getElementById('logIn').style.visibility = 'visable';
            logbtn.textContent='登入';
            logbtn.addEventListener('click', e => {
            window.location.href = 'index.html';
            });
        }
    }, function (error) {
        console.log(error);
    });
};
window.addEventListener('load', function () {
    initApp()
});