Meteor.methods({
	updateUserPhoto: function(userAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		// ensure that this is the user's profile
		if (user._id !== userAttributes.id)
			throw new Meteor.Error(401, "Dude, this is not your profile! Leave!");

		Meteor.users.update({_id: userAttributes.id}, {$set: {"profile.thumblink": userAttributes.thumblink}});

	}
});
