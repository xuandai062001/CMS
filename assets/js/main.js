$(document).ready(function(){
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length); // loại bỏ khoảng trắng đầu dòng nếu có
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    //LOAD HEADER
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

        //LOAD USER PROFILE
        function loadUserProfile(){
            $(".content .card .card-body").load("template-parts/editProfile.html", function (){

                function loadData(){
                    let email = getCookie("email");
                    if(!email && !password){
                        email = sessionStorage.getItem('email');
                    }

                    let users = JSON.parse(localStorage.getItem('users')) || {};
                    const firstName = users[email].firstName;
                    const lastName = users[email].lastName;
                    const phone = users[email].phone;
                    const description = users[email].description;

                    $("#email").val(email);
                    $('#firstName').val(firstName);
                    $('#lastName').val(lastName);
                    $('#phone').val(phone);
                    $('#description').val(description);

                }

                loadData();

                $("#reset-btn").click(function (e){
                    e.preventDefault();
                    loadData();
                })

                $("#submit-btn").click(function (e){
                    e.preventDefault();
                    let email = getCookie("email");
                    let password = getCookie("password");
                    if(!email && !password){
                        email = sessionStorage.getItem('email');
                        password = sessionStorage.getItem('password');
                    }

                    const firstName = $('#firstName').val();
                    const lastName = $('#lastName').val();
                    const phone = $('#phone').val();
                    const description = $('#description').val();

                    if(firstName.length < 3){
                        alert("First name must be greater or equal 3");
                        return;
                    }

                    if(firstName.length > 30){
                        alert("First name must be less than or equal 30");
                        return;
                    }

                    if(lastName.length < 3){
                        alert("Last name must be greater or equal 3");
                        return;
                    }

                    if(lastName.length > 30){
                        alert("Last name must be less than or equal 30");
                        return;
                    }

                    if(phone.length < 9){
                        alert("Phone must be greater or equal 9");
                        return;
                    }

                    if(phone.length > 13){
                        alert("Phone must be less than or equal 13");
                        return;
                    }

                    if(description.length > 200){
                        alert("Description must be less than or equal 200")
                        return;
                    }

                    let users = JSON.parse(localStorage.getItem('users')) || {};

                    users[email] = { password: password, firstName: firstName,  lastName: lastName, phone: phone, description: description};
                    localStorage.setItem('users', JSON.stringify(users));

                    alert("Profile updated successfully")
                })
            })
        }

        loadUserProfile();

        $("#user-profile").click(function (){
            loadUserProfile();
            let tabTitle = $(this).attr("tab-title");
            let cardTitle = $(this).attr("card-title");
            $(".content .tab-title").text(tabTitle);
            $(".content .card-title").text(cardTitle);
        })

    });


    //LOAD SIDEBAR
    $(".sidebar").load("template-parts/sidebar.html", function (){
        function checkActiveTab(){
            var url = new URL(document.location.href);
            var params = new URLSearchParams(url.search);
            var tab = params.get('tab');

            $(".tab-btn").each(function (){
                if($(this).attr("id") == tab){
                    $(this).click();
                }
            });
        }

        //Form and content
        $(".tab-btn").click(function (){

            var url = new URL(document.location.href);
            var params = new URLSearchParams(url.search);
            var tab = params.get('tab');

            $(".tab-btn").removeClass("active");
            $(this).addClass("active");

            var newUrl = document.location.href.split('?tab=')[0] + "?tab=" + $(this).attr('id');
            history.pushState({}, "", newUrl);

            let tabTitle = $(this).attr("tab-title");
            let cardTitle = $(this).attr("card-title");
            $(".content .tab-title").text(tabTitle);
            $(".content .card-title").text(cardTitle);

            if($(this).attr('id') == "form-content"){
                $(".content .card .card-body").load("template-parts/formContent.html", function (){
                    $('#submit-btn').click(function(e) {
                        e.preventDefault();
                        const title = $('#title').val();
                        const brif = $('#brif').val();
                        const content = $('#content').val();
                        let contents = JSON.parse(localStorage.getItem('contents')) || {};

                        if (title === '' || brif === '' || content === '') {
                            alert('Please fill all fields');
                            return;
                        }

                        if(title.length < 10){
                            alert("Title must be greater than or equal 10");
                            return;
                        }

                        if(title.length > 200){
                            alert("Title must be less than or equal 200");
                            return;
                        }

                        if (contents[title]) {
                            alert('This title already exists!');
                            return;
                        }

                        if(brif.length < 30){
                            alert("Brif must be greater than or equal 30");
                            return;
                        }

                        if(brif.length > 150){
                            alert("Title must be less than or equal 150");
                            return;
                        }

                        if(content.length < 50){
                            alert("Content must be greater than or equal 50");
                            return;
                        }

                        if(content.length > 1000){
                            alert("Content must be less than or equal 1000");
                            return;
                        }

                        const now = new Date();

                        const day = String(now.getDate()).padStart(2, '0');
                        const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
                        const year = now.getFullYear();

                        const hours = String(now.getHours()).padStart(2, '0');
                        const minutes = String(now.getMinutes()).padStart(2, '0');

                        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

                        contents[title] = { brif: brif, content: content, createdDate: formattedDate};
                        localStorage.setItem('contents', JSON.stringify(contents));
                        alert('Registration Content successful!');
                    });
                });
            }

            //View content
            if($(this).attr('id') == "view-content"){
                $('.loading').show();
                let tabTitle = $(this).attr("tab-title");
                let cardTitle = $(this).attr("card-title");
                $(".content .tab-title").text(tabTitle);
                $(".content .card-title").text(cardTitle);
                $.ajax({
                    url: 'template-parts/viewContent.html',
                    method: 'GET',
                    success: function(data) {

                        let contents = JSON.parse(localStorage.getItem('contents')) || {};

                        if(Object.keys(contents).length !== 0){
                            console.log(contents);
                            setTimeout(function (){
                                $(".content .card .card-body").html(data);
                                let count = 1;
                                for (let title in contents) {
                                    $(".content .card .card-body .table tbody").append(''+
                                        '<tr>' +
                                            '<th class="col-1" scope="row">'+ count + '</th>' +
                                            '<td class="col-3">' + title + '</td>' +
                                            '<td class="col-6">' + contents[title].brif + '</td>' +
                                            '<td class="col-2">'+ contents[title].createdDate + '</td>' +
                                        '</tr>');
                                    count++;
                                }
                                $('.loading').hide();
                            }, 500);
                        }
                        else{
                            $(".content .card .card-body").html('<h3>No posts found</h3>');
                            $('.loading').hide();
                        }

                    },
                    error: function() {
                        console.log('Failed to load main.html');
                        $('.loading').hide();
                    }
                });
            }

        });


        checkActiveTab();

    })

    // REGISTER
    $('#register-btn').click(function(e) {
        e.preventDefault();
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
            alert('Username min length must be greater than or equal 3');
            return;
        }

        if (username.length > 30){
            alert('Username max length must be less than or equal 30');
        }

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if(email.length < 5){
            alert('Email min length must be greater than or equal 5');
            return;
        }

        if(email.length > 50){
            alert('Email max length must be less than or equal 50');
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

    //LOGIN

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

        if(email.length < 5){
            alert('Email min length must be greater than or equal 5');
            return;
        }

        if(email.length > 50){
            alert('Email max length must be less than or equal 50');
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
            setCookie('email', email, 7);
            setCookie('password', password, 7);
        }
        else{
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('password', password);
        }

        window.location.href = 'index.html?tab=user-profile';
    });


    //LOGOUT

    $('#logout-btn').click(function() {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        setCookie("email", "", 0);
        setCookie("password", "", 0);
        window.location.href = 'login.html';
    });


});
