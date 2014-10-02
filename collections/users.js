// I need to change the permissions to allow only certain fields + the person who owns the profile
Meteor.users.allow({
	update: function() {
		return true;
	}

})