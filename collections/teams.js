Teams = new Meteor.Collection('teams');

Meteor.methods({
	sendEmail: function(to, from, personInviting) {
		/****** TO SEND AN EMAIL ******/
		/* The MAIL_URL environment variable should be of the form smtp://USERNAME:PASSWORD@HOST:PORT/. Check the docs @ http://docs.meteor.com/#email_send */

		// Let other method calls from the same client start running,
	    // without waiting for the email sending to complete.
	    this.unblock();

	    Email.send({
	      to: to,
	      from: from,
	      subject: 'Hey Museomixer, join my project!',
	      text: 'You have been added to the museomix platform by ' + personInviting + '. Go to xxx & create an account using this email address. Then, start creating amazing projects!'
	    });
	},
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

		// If the user is new, send him an email
		if (memberAttributes.userID == '') {
			if (user.profile) {
				if (user.profile.name)
					var personInviting = user.profile.name;
				else 
					var personInviting = user.username;
			} else
				var personInviting = user.username;

			Meteor.call('sendEmail', memberAttributes.email, user.emails[0].address, personInviting );
		}

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