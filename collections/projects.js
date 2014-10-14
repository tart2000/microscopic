Projects = new Meteor.Collection('projects');

Meteor.methods({
	updateProject: function(projectAttributes) {
		var user = Meteor.user();
		var inTeam = Teams.findOne({"userID": user._id});

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		//ensure that the user is in the team
		if (!inTeam)
			throw new Meteor.Error(401, "Dude, this is not your team! Leave!");

		var updatedProjectInfo = _.extend(
			_.pick(
				projectAttributes, 
				'title', 
				'baseline',
				'hub',
				'licence',
				'url',
				'description',
				'instructions',
				'videolink'
			), 
		{});

		Projects.update({_id: projectAttributes.id}, {$set: updatedProjectInfo});
	},
	deleteProject: function(projectID) {
		var user = Meteor.user();
		var inTeam = Teams.findOne({"userID": user._id});
		
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		//ensure that the user is in the team
		if (!inTeam)
			throw new Meteor.Error(401, "Dude, this is not your team! Leave!");

		// Remove the project's photos
		prjPhotos.remove({"metadata.projectID": projectID});

		// Remove the project's team
		Teams.remove({"projectID": projectID});

		// Remove the project's comments
		Comments.remove({"projectId": projectID});

		//Finally, we remove the project itself
		Projects.remove(projectID);
	}
});