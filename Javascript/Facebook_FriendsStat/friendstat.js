// Global for the post
var gender = {female: 0, male: 0};
var axis = [], frequency = [];
var total = 0;

window.fbAsyncInit = function() {
  FB.init({
    appId      : '321578211230129', // App ID
    //channelUrl : '//sydneyitguy.com/project/friendstat/channel.php', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });
};

// Load the SDK Asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));


var Person = function(id, name, age, gender) {
  this.id = id;
  this.name = name;
  this.age = age;
  this.gender = gender;
}

var FriendStats = {
  friends: [],
  
  // Need an Observer
  add: function(person) {
    this.friends.push(person);
    this.update();
  },
  
  update: function() {
    var len = this.friends.length;
    gender = {female: 0, male: 0} // Initialize
    var count = 0, sum = 0, ages = [], group = [];
    for (var i = 0; i < len; i++) {
      count++;
      var age = this.friends[i].age;
      sum += age;
      ages.push(age);
      if(typeof group[age] == 'undefined') {
        group[age] = 1;
      } else {
        group[age]++;
      };
      this.friends[i].gender == 'male' ? gender.male++ : gender.female++;
    }
    
    $('#count').text(count);
    $('#count-male').text(gender.male);
    $('#count-female').text(gender.female);
    $('#average').text((sum/len).toFixed(2));
    $('#median').text(this.median(ages));
    
    this.barChart(group);
    this.pieChart(gender);
  },
  
  median: function(ages) {
    var len = this.friends.length;
    var middle = Math.floor(len/2);
    ages.sort();
    if(len%2 == 1) {
      return ages[middle]; 
    }
    return (ages[middle - 1] + ages[middle]) / 2;
  },
  
  barChart: function(group) {
    axis = [], frequency = [];
    for(key in group) {
      axis.push(key);
      frequency.push(group[key]);
    }
    
    $("#bar-chart").kendoChart({
      title: { text: "Age distribution" },
      series: [{
        name: "Age",
        data: frequency
      }],
      categoryAxis: {
        categories: axis
      }, 
      tooltip: { visible: true }
    });
  },
  
  pieChart: function(gender) {
    total = gender.male + gender.female;
    $("#pie-chart").kendoChart({
      title: { text: "Male vs Female" },
      seriesDefaults: {
        labels: {
          visible: true,
          format: "{0}%"
        }
      },
      series: [{
        type: "pie",
        data: [{
          category: "Male",
          value: Math.round((gender.male / total) * 100)
        }, {
          category: "Female",
          value: Math.round((gender.female / total) * 100)
        }]
      }],
      tooltip: {
        visible: true,
        format: "{0}%"
      }
    });
  }
}

// Array extension for max function
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

// Facebook API wrapper
var FBApp = function() {
  this.launch = function() {
    var self = this;
    FB.login(function(response) {
      if (response.authResponse) {
        // After login success
        self.getData();
        $('#container').fadeIn(5000, function() {
          $('#launch').text("Relaunch the statistics").fadeIn();
          $('#like').fadeIn();
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'user_birthday,friends_birthday'});
  };
  
  this.getData = function() {
    FB.api('/me/?fields=id,name,birthday', function(user) {
      $("#my").hide().text(user.name + "'s").fadeIn(1000);
    });
    
    FB.api('/me/friends', function(response) {
      var today = new Date();
      var year = today.getFullYear();
    
      data = response.data;
      for(var i in data) {
        FB.api('/' + data[i].id + '/?fields=id,name,birthday,gender', function(user) {
          if(typeof user.error === "undefined" && typeof user.birthday !== "undefined") {
            var age = year - user.birthday.split('/')[2] + 1;
            if(!isNaN(age)) {
              FriendStats.add(new Person(user.id, user.name, age, user.gender));
            }
          }
        });
      };
    });
  };
  
  this.postFeed = function() {
    var barMax = (Array.max(frequency)+ 7);
    var barImg = 'http://chart.apis.google.com/chart?chxl=1:|' + axis.join('|') + '&chd=t:' + frequency.join(',') + '&chxr=0,0,' + barMax + '&chds=0,' + barMax +
                 '&chxs=1,676767,11.5,-0.5,l,676767&chxt=y,x&chbh=a,10&chs=350x250&cht=bvs&chco=FF7313&chma=0,0,0,5&chtt=Age+Distribution&chts=3072F3,12.5';
    var pieImg = 'http://chart.apis.google.com/chart?chs=350x250&cht=p&chd=t:' + gender.male + ',' + gender.female +'&chco=AEB426|FF7313&chdl=Male|Female' +
                 '&chl=' + (Math.round((gender.male/total)*100)) + '%|' + (Math.round((gender.female/total)*100)) +'%&chma=0,15&chtt=Male+vs+Female&chts=3072F3,14.5&chdlp=b';
    
    FB.ui({
      method: "stream.publish",
      display: "iframe",
      user_message_prompt: "Share your friends stats!",
      attachment: {
        name: "My Friends' Statistics",
        caption: "http://sydneyitguy.com/project/friendstat/",
        description: "See my friends' age distribution and proportion between the male and female friends",
        href: "http://sydneyitguy.com/project/friendstat/",
        media:[{
          "type":"image",
          "src":barImg,
          "href":barImg
        }, { 
          "type":"image",
          "src":pieImg,
          "href":pieImg
        }]
      },
      action_links: [{ text: "My Friends' Statistics", href: 'http://sydneyitguy.com/project/friendstat/' }]
    },
    function(response) {
      if (response && response.post_id) {
        $('#like').text("Thank you!").removeClass('btn-primary');
      } else {
        // If failed?
      }
    });
  }
}


// Events binding
$(function() {
  var app = new FBApp();
  $('#launch').click(function() {
    app.launch();
  });
  
  // Post feed
  $('#like').live('click', function() {
    app.postFeed();
  });
});