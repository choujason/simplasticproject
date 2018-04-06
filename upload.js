initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        var logbtn = document.getElementById('logbtn');
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
//            var email = user.email;
//            var emailVerified = user.emailVerified;
//            var photoURL = user.photoURL;
            var uid = user.uid;
//            var phoneNumber = user.phoneNumber;
//            var providerData = user.providerData;
          
            // log out function
            logbtn.textContent='登出';
            logbtn.addEventListener('click', e => {
                firebase.auth().signOut();
                window.location.href = 'logOutpage.html';
            });


            user.getIdToken().then(function (accessToken) {
                document.getElementById('sign-in-status').textContent = '親愛的'+user.displayName+'，今天過得好嗎？每週只需要上傳1次Simplastic使用狀況，就可以參加每週的商品禮卷抽獎喔！當然，傳得越多，中獎機率越高喔';
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
             fileButton.addEventListener('change', function (e) {
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
                         document.getElementById('sign-in-status').textContent = '太好了，圖片正在上傳中喔！';
                         state.innerHTML = "上傳中...";
                     },
                     function error(err) {
                         state.innerHTML = "上傳錯誤，請再重新上傳一次ＱＱ";
                     },
                     function complete() {
                         state.innerHTML = "上傳成功:D";
                         document.getElementById('sign-in-status').textContent = '噹噹噹～～～上傳完成!';
//                         location.reload();
                     });
             });
        } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = '請先登入喔!';
            document.getElementById('state').textContent = "";
            document.getElementById('uploadContainer').style.visibility = 'hidden';
            
            logbtn.textContent='登入';
            logbtn.addEventListener('click', e => {
                window.location.href = 'index.html';
                document.getElementById('sign-in').textContent = 'Sign in';
                document.getElementById('account-details').textContent = 'null';

            });
        }
    }, function (error) {
        console.log(error);
    });
};
window.addEventListener('load', function () {
    initApp()
});