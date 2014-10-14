Meteor.methods({
	updateUserPhoto: function(userAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		// ensure that this is the user's profile
		if (user._id !== userAttributes.id)
			throw new Meteor.Error(401, "Dude, this is not your profile! Leave!");

		Meteor.users.update({_id: user._id}, {$set: {"profile.thumblink": userAttributes.thumblink}});

	},

	updateUserInfo: function(userAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		// ensure that this is the user's profile
		if (user._id !== userAttributes.id)
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

		Meteor.users.update({_id: user._id}, {$set: updatedUserInfo});

	},

});
