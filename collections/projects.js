Projects = new Meteor.Collection('projects');

Meteor.methods({
	createProject: function(projectAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login before creating a project...");

		var projectInfo = _.extend(
			_.pick(
				projectAttributes, 
				'title', 
				'baseline',
				'hub'
			), 
			{
				author: user._id,
				created: new Date().getTime()
			}
		);

		// Insert the project
		var projectID = Projects.insert(projectInfo);

		// Add the creator to the team
		Teams.insert({ 
			"projectID" : projectID, 
			"userID" : user._id, 
			"user" : user.username, 
			"email" : user.emails[0].address, 
			"role" : "core"
		});

		return projectID;
	},

	updateProject: function(projectAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		var inTeam = Teams.findOne({"userID": user._id}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
		var projectAuthor = Projects.findOne({_id: projectAttributes.id}).author;

		// Ensure that the user is in the team or that he is the author
		if ( (projectAuthor !== user._id) && (!inTeam) )
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
		
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		var inTeam = Teams.findOne({"userID": user._id}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
		var projectAuthor = Projects.findOne({_id: projectID}).author;

		// Ensure that the user is in the team or that he is the author
		if ( (projectAuthor !== user._id) && (!inTeam) )
			throw new Meteor.Error(401, "Dude, this is not your team! Leave!");

		// Remove the project's photos
		prjPhotos.remove({"metadata.projectID": projectID});

		// Remove the project's team
		Teams.remove({"projectID": projectID});

		// Remove the project's comments
		Comments.remove({"projectId": projectID});

		//Finally, we remove the project itself
		Projects.remove(projectID);
	},
	addTag: function(projectAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		var inTeam = Teams.findOne({"userID": user._id}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
		var projectAuthor = Projects.findOne({_id: projectAttributes.id}).author;

		// Ensure that the user is in the team or that he is the author
		if ( (projectAuthor !== user._id) && (!inTeam) )
			throw new Meteor.Error(401, "Dude, this is not your team! Leave!");

		var updatedProjectInfo = _.extend(
			_.pick(
				projectAttributes, 
				'newTag'
			), 
		{});

		Projects.update({_id:projectAttributes.id}, {$addToSet: {tags: updatedProjectInfo.newTag}});
	},
	removeTag: function(projectAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		var inTeam = Teams.findOne({"userID": user._id}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
		var projectAuthor = Projects.findOne({_id: projectAttributes.id}).author;

		// Ensure that the user is in the team or that he is the author
		if ( (projectAuthor !== user._id) && (!inTeam) )
			throw new Meteor.Error(401, "Dude, this is not your team! Leave!");

		var updatedProjectInfo = _.extend(
			_.pick(
				projectAttributes, 
				'oldTag'
			), 
		{});

		Projects.update({_id:projectAttributes.id}, {$pull: {tags: updatedProjectInfo.oldTag}});
	},

});

Projects.allow({
	insert: function(userId) {
		return !! userId;
	}
});

Projects.deny({	
	update: function() {
		return false;
	},
	remove: function() {
		return false;
	}
})