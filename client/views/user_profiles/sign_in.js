Template.signIn.rendered = function() {
	Session.get('success', false);

	trimInput = function(val) {
		return val.replace(/^\s*|\s*$/g, "");
	},
	isValidPassword = function(val) {
		return val.length >= 6 ? true : false; 
	},
	isValidUsername = function(val) {
		var user = Meteor.users.findOne({"username": val});

		return !user ? true : false; 
	}
},
Template.signIn.helpers({
	getEmail: function() {
		return Router.current().params.email;
	},
	isValidEmail: function() {
		var emailInUrl = Router.current().params.email;

		console.log(emailInUrl);
		if ( !Teams.findOne({"email": emailInUrl}) ) {
			if (!Session.get('success'))
				Alert.add("Are you sure you copied the right url? Probably not... Try again and if it doesn't work, ask the person to delete & re-enter you in the team.", "danger", {
	                fadeIn: 1000, fadeOut: 1000, autoHide: 5000
	            });

			return false;
		} else {
			return true;
		}
	}
});

Template.signIn.events({
	'submit #login-form' : function(e, t){

		e.preventDefault();

		// retrieve the input field values
		var username = t.find('#account-username').value
		, email = t.find('#account-email').value
        , password = t.find('#account-password').value;

        // Trim and validate the input
        var email = trimInput(email);

        if (!isValidPassword(password)) {
        	Alert.add("Your password must be at least 6 characters long.", "danger", {
                fadeIn: 1000, fadeOut: 1000, autoHide: 5000
            });
	    	return false;
	  	}

	  	if (!isValidUsername(username)) {
        	Alert.add("Someone has already taken this username.", "danger", {
                fadeIn: 1000, fadeOut: 1000, autoHide: 5000
            });
	    	return false;
	  	}

        Accounts.createUser({username: username, email: email, password : password}, function(err){
          if (err) {
          	Alert.clear();
            Alert.add("Huston, we have a problem: " + err, "danger");
          } else {
          	Session.set('success', true);

          	var currentUser = Meteor.user();

            Router.go("userProfile", {'_id': currentUser._id});
            Alert.clear();
            Alert.add("Awesome! Wanna add your info now?", "success");
          }

        });

      return false;

	}
})