Template.comment.helpers({ 
    submittedText: function() {
        return moment(this.submitted).fromNow(); 
    }
});