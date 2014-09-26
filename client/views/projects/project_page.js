Template.projectPage.helpers({ 
    projectTags: function() {
        return this.tags; 
    },
    hasTags: function() {
        return Projects.findOne(this._id).tags;
    },
    hasUrl: function() {
        return Projects.findOne(this._id).url;
    },
    projectComments: function() {
        return Comments.find({projectId: this._id}, {sort: {submitted: -1}}); 
    },
    projectCommentCount : function() {
        var comCount = Comments.find({projectId: this._id}).count(); 
        if (comCount > 0)
        return Comments.find({projectId: this._id}).count();
    }
});