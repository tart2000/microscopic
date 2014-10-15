Teams = new Meteor.Collection('teams');

Meteor.methods({
	addMember: function(memberAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		var inTeam = Teams.findOne({"userID": user._id, "projectID": memberAttributes.projectID}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
		var projectAuthor = Projects.findOne({_id: memberAttributes.projectID}).author;

		// Ensure that the user is in the team or that he is the author
		if ( (projectAuthor !== user._id) && (!inTeam) )
			throw new Meteor.Error(401, "Dude, this is not your team! Leave!");

		// Check that the member has not been already added
		var memberExists = Teams.findOne({"projectID": memberAttributes.projectID, "email" : memberAttributes.email});

		if (memberExists)
			throw new Meteor.Error(302, "You have already added this member as a " + memberExists.role);

		var newMember = _.extend(
			_.pick(
				memberAttributes, 
				'projectID',
            	'userID',
            	'user',
            	'email',
            	'role'
			), 
		{});

		Teams.insert(newMember);
	},
	removeMember: function(memberAttributes) {
		var user = Meteor.user();

		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "Dude, how did you get here? You're not even logged in!");

		var inTeam = Teams.findOne({"userID": user._id, "projectID": memberAttributes.projectID}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
		var projectAuthor = Projects.findOne({_id: memberAttributes.projectID}).author;

		// Ensure that the user is in the team or that he is the author
		if ( (projectAuthor !== user._id) && (!inTeam) )
			throw new Meteor.Error(401, "Dude, this is not your team! Leave!");

		Teams.remove(memberAttributes.deleted);
	},
});

Teams.deny({
	insert: function() {
		return false;
	},
	update: function() {
		return false;
	},
	remove: function() {
		return false;
	}
})