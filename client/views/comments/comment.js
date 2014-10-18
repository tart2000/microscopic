Template.comment.helpers({ 
    submittedText: function() {
        return moment(this.submitted).fromNow(); 
    },
    currentUser: function() {
        return Meteor.users.findOne({_id: this.userId});
    },
});