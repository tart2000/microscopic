if (Meteor.isServer) {
	Accounts.onCreateUser(function(options, user) {

		if (Teams.findOne()) {
		    // When the user signs is, check if he is in a team
			var teamsFound = Teams.find({"email" : user.emails[0].address});    

			teamsFound.forEach(function(team) {
				Teams.update({'_id':team._id}, {$set: {'userID':user._id, 'user': user.username}});
			});
		}


		if (options.profile)
	    	user.profile = options.profile;

		return user;
	});
}

Meteor.methods({
	updateUserPhoto: function(userAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		// ensure that this is the user's profile or that an admin is editing
		if ( (user._id !== userAttributes.id) && (!Roles.userIsInRole(user, ['admin'])) )
			throw new Meteor.Error(401, "Dude, this is not your profile! Leave!");

		Meteor.users.update({_id: userAttributes.id}, {$set: {"profile.thumblink": userAttributes.thumblink}});

	},

	updateUserInfo: function(userAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		// ensure that this is the user's profile or that an admin is editing
		if ( (user._id !== userAttributes.id) && (!Roles.userIsInRole(user, ['admin'])) )
			throw new Meteor.Error(401, "Dude, this is not your profile! Leave!");

		var updatedUserInfo = _.extend(
			_.pick(
				userAttributes, 
				'profile.name', 
				'profile.role',
				'profile.hub',
				'profile.social.facebook',
				'profile.social.twitter',
				'profile.social.linkedin',
				'profile.social.instagram',
				'profile.social.tumblr',
				'profile.social.website'
			), 
		{});

		Meteor.users.update({_id: userAttributes.id}, {$set: updatedUserInfo});

	},

});
