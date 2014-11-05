Template.userActivity.helpers({
	getActivity: function() {

		// Get the user's comments
		var comments = Comments.find().fetch();

		// Get the user's teams
        var teams = Teams.find().fetch();

		// Add comments & teams in a single array
		var docs = comments.concat(teams);

		// Order the joint array by decreasing date
		return _.sortBy(docs, function(doc) {return -doc.submitted;});
	},
	isComment: function(activity) {
		if (!activity.role)
			return true;
	},
	getProjectName: function(projectID) {
		return Projects.findOne({"_id": projectID}).title;
	},
	getTimePassed: function() {
		return moment(this.submitted).fromNow();
	}
})