Comments = new Meteor.Collection('comments');

Meteor.methods({
    comment: function(commentAttributes) {
        var user = Meteor.user();
        var project = Projects.findOne(commentAttributes.projectId); // ensure the user is logged in

        if (!user)
            throw new Meteor.Error(401, "You need to login to make comments"); 

        if (!commentAttributes.body)
            throw new Meteor.Error(422, 'Please write some content'); 

        if (!project)
            throw new Meteor.Error(422, 'You must comment on a project');

        var newComment = _.extend(_.pick(commentAttributes, 'projectId', 'body'), { 
            userId: user._id, 
            author: user.username, 
            submitted: new Date().getTime()
        });
        
        return Comments.insert(newComment); 
    }
});