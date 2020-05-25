const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const loginCheck = user => {
    if (user) {
        loggedInLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');
    } else {
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
    }
}

// SingUP
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
    
    console.log(email, password);

    auth.
        createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // clear the form
            signupForm.reset();

            // close the modal
            $('#signUpModal').modal('hide');

            console.log('sign up');
        })


});

// SignIn

const singinForm = document.querySelector('#login-form');

singinForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    console.log(email, password);

    auth.
        signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // clear the form
            singinForm.reset();

            // close the modal
            $('#signInModal').modal('hide');

            console.log('sign in');
        })

});

const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();

    auth.
        signOut().then(() => {
            console.log('log out');
        })

});

// Google Login

const googleLogin = document.querySelector('#googleLogin');

googleLogin.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            console.log('google sign in')

            singinForm.reset();

            // close the modal
            $('#signInModal').modal('hide');

        })
        .catch(err => {
            console.log(err)
        })
})

// Facebook Login

const facebookLogin = document.querySelector('#facebookLogin');

facebookLogin.addEventListener('click', e => {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider)
        .then(result => {
            console.log('facebook sign in')

            singinForm.reset();
            // close the modal
            $('#signInModal').modal('hide');
        })
        .catch(err => {
            console.log(err);
        })
})

//Publicaciones

const postList =  document.querySelector('.posts');
const setupPosts = data => {
    if(data.length){
        let html = '';
        data.forEach(doc => {
            const post = doc.data()
            //console.log(post)
            const li = `
                <li class = "list-group-item list-group-item-action">
                    <h5>${post.title}</h5>
                    <p>${post.description}</p>
                </li>
            `;
            html += li;
        });
        postList.innerHTML = html;
    } else {
        postList.innerHTML = '<p class = "text-center" >Login to see posts </p>';
    }
}

// Events
// list for auth state changes
auth.onAuthStateChanged(user => {
    if(user){
        console.log('auth: sign in')
        fs.collection('posts')
            .get()
            .then((snapshot) => {
                setupPosts(snapshot.docs);
                loginCheck(user);
            })
    } else {
        console.log('auth: sign out')
        setupPosts([])
        loginCheck(user);
    }
})




