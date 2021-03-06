initApp = function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var uid = user.uid;
                    var phoneNumber = user.phoneNumber;
                    var providerData = user.providerData;
                    var logOutbutton = document.getElementById("logOut");
                    var logInbutton = document.getElementById("logIn");
                    // log out function
                    document.getElementById('logOut').style.visibility = 'visable';
                    document.getElementById('logIn').remove();

                    logOutbutton.addEventListener('click', e => {
                        firebase.auth().signOut();
                        window.location.href = 'logOutpage.html';
                    });
                    user.getIdToken().then(function(accessToken) {
                        document.getElementById('sign-in-status').textContent = '分享些你重複使用塑膠袋的方式吧！';
                        document.getElementById('sign-in').textContent = 'Hello, ' + user.displayName;
                        //                        document.getElementById('account-details').textContent = JSON.stringify({
                        //                            displayName: displayName,
                        //                            email: email,
                        //                            emailVerified: emailVerified,
                        //                            phoneNumber: phoneNumber,
                        //                            photoURL: photoURL,
                        //                            uid: uid,
                        //                            accessToken: accessToken,
                        //                            providerData: providerData
                        //                        }, null, '  ');
                    });

                    //upload image

                    var uploader = document.getElementById('uploader');
                    var fileButton = document.getElementById('fileButton');
                    var state = document.getElementById('state');
                    // listen for file selection
                    fileButton.addEventListener('change', function(e) {
                        //get file
                        var file = e.target.files[0];
                        //create ref
                        var storageRef = firebase.storage().ref(user.displayName.toString());
                        var imgRef = storageRef.child(file.name + '-' + Date());
                        //upload file
                        var task = imgRef.put(file);
                        //update progress bar
                        task.on('state_changed',
                            function progress(snapshot) {
                                var percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
                                uploader.value = percentage;
                                $("#uploader")
                                    .css("width", percentage + "%")
                                    .attr("aria-valuenow", percentage)
                                    .text(percentage + "%");
                                state.innerHTML = "上傳中...";
                            },
                            function error(err) {
                                state.innerHTML = "上傳錯誤，請重新上傳";
                            },
                            function complete() {
                                state.innerHTML = "上傳完成!";
                                location.reload();
                            });
                    });
                } else {
                    // User is signed out.
                    document.getElementById('sign-in-status').textContent = '請先登入喔!';
                    document.getElementById('state').textContent = "";
                    document.getElementById('logOut').remove();
                    document.getElementById('uploadContainer').style.visibility = 'hidden';
                    document.getElementById('logIn').style.visibility = 'visable';
                    document.getElementById('logIn').addEventListener('click', e => {
                        window.location.href = 'index.html';
                        document.getElementById('sign-in').textContent = 'Sign in';
                        document.getElementById('account-details').textContent = 'null';

                    });
                }
            }, function(error) {
                console.log(error);
            });
        };
        window.addEventListener('load', function() {
            initApp()
        });