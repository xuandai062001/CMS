$(document).ready(function(){
    $(".header").load("template-parts/header.html", function (){
        $(".header .btn").click(function (){
            if($(this).parent().hasClass("active")){
                $(this).parent().removeClass("active");
            }
            else{
                $(this).parent().addClass("active");
            }
        });


        $(document).click(function (e)
        {
            var container = $(".header .btn");

            if (!container.is(e.target) && container.has(e.target).length === 0)
            {
                container.parent().removeClass("active");
            }
        })

    });


    $(".sidebar").load("template-parts/sidebar.html", function (){

    })




    // Register
    $('#register-btn').click(function(e) {
        e.preventDefault();
        $('#show-login-form').click();
        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const repassword = $('#re-password').val();

        const validateUsername = (username) =>{
            return String(username).match(/^[a-zA-Z0-9]([._]?[a-zA-Z0-9])*[a-zA-Z0-9]$/);
        }

        if (email === '' || password === '' || username === '' || repassword === '') {
            alert('Please fill all fields');
            return;
        }

        if(!validateUsername(username)){
            alert('Please enter a valid username');
            return;
        }

        if(username.length < 3){
            alert('Min length must be greater than or equal 3');
            return;
        }

        if (username.length > 30){
            alert('Max length must be less than or equal 30');
        }




        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if(email.length < 5){
            alert('Min length must be greater than or equal 5');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if(password.length < 8){
            alert('Password must be greater than or equal 8');
            return;
        }

        if(password.length > 30){
            alert('Password must be less than or equal 30');
            return;
        }

        if(password != repassword){
            alert('Passwords do not match!');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[email]) {
            alert('Email already exists!');
            return;
        }

        for (let userEmail in users) {
            if (users[userEmail].username === username) {
                alert('Username already exists!');
                return;
            }
        }

        users[email] = { username: username, password: password };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        window.location.href = 'login.html';
    });

    //Login

    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    $('#login-btn').click(function(e) {

        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(":checked")

        if (email === '' || password === '') {
            alert('Please fill all fields');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || {};

        if (!users[email]) {
            alert('User does not exist!');
            return;
        }

        if (users[email].password !== password) {
            alert('Incorrect password!');
            return;
        }

        if (rememberMe){
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);        }
        else{
            setCookie('email', email, 0.5);
            setCookie('password', password, 0.5);
        }

        window.location.href = 'viewContent.html';


    });
});
