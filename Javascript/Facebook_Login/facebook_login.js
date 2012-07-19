/**
 * Facebook Login API Wrapper
 * 
 * @author Sebastian Kim
 */

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

// Facebook Login / Stream API wrapper
var FBStream = {
    button: $('#facebook-login'),
    userinfo: {
        container: $('.facebook-user'),
        photo: $('.user-photo'),
        name: $('.user-name')
    },
    form: {
        container: $('#some-form'),
        name: $('#name'),
        email: $('#email'),
        button: $('#some-form input[type=submit]'),
        description: 'just test',
        caption: 'caption',
        link: 'http://link.com',
        poster: 'poster'
    },

    init: function() {
        var self = this;
        this.button.click(function() {
            FB.login(function(response) {
                if (response.authResponse) { // Login success
                    FB.api('/me/?fields=id,name,email,link', function(user) {
                        self.displayLoginInfo(user);
                        self.fillForm(user);
                        self.button.fadeOut();
                        self.bindForm();
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: 'publish_stream,email' });
            return false;
        });
    },

    // Display user information
    displayLoginInfo: function(user) {
        this.userinfo.photo.html('<a href="' + user.link + '">'
            + '<img src="http://graph.facebook.com/' + user.id 
            + '/picture" alt="' + user.name + '" /></a>')
        this.userinfo.name.html(user.name);
        this.userinfo.container.show();
    },

    // Fill the form with user's information
    fillForm: function(user) {
        this.form.name.val(user.name);
        this.form.email.val(user.email);
        this.form.container.show();
    },

    bindForm: function() {
        var self = this;
        this.form.container.submit(function (e) {
            e.preventDefault();
            //Post the review to Facebook
            FB.api('/me/feed', 'post', {
                description: self.form.description,
                caption: self.form.caption,
                link: self.form.link,
                name: self.form.poster
            }, function (data) {
                if(!data.id) { // On error
                    console.log(data);
                }
            });
        });
    }
}

// Onload
window.fbAsyncInit = function() {
    FB.init({
        appId      : '123456789', // App ID
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });
    FBStream.init();
}
