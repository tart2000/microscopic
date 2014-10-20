Hubs = new Meteor.Collection('hubs');

Meteor.methods({
	updateHub: function(hubAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		// ensure that the user is an admin
		if (!Roles.userIsInRole(user, ['admin']))
			throw new Meteor.Error(401, "Dude, this is not your hub! Leave!");

		var updatedHubInfo = _.extend(
			_.pick(
				hubAttributes, 
				'name', 
				'country',
				'description',
				'teams',
				'social.facebook',
				'social.twitter',
				'social.linkedin',
				'social.instagram',
				'social.tumblr',
				'social.website'
			), 
		{});

		// Update the projects in the hub if the hub name has changed
		var currentName = Hubs.findOne({_id: hubAttributes.id}).name;

		if (currentName !== hubAttributes.name) {
			var hubProjects = Projects.find({"hubID": hubAttributes.id});

			hubProjects.forEach(function(project) {
				Projects.update({'_id': project._id}, {$set: {'hub': hubAttributes.name}});
			});

		}

		Hubs.update({_id: hubAttributes.id}, {$set: updatedHubInfo});


	}
})