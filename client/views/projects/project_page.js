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
        return Comments.find(); 
    },
    projectCommentCount : function() {
        var comments = Comments.find(); 

        if (comments)
            return comments.count();
    },
    licenceImage: function() {
        var thisLicence = this.licence;
        var theLicence = Licences.findOne({name: thisLicence});
        return theLicence.thumblink;
    }, 
    licenceLink: function() {
        var thisLicence = this.licence;
        var theLicence = Licences.findOne({name: thisLicence});
        return theLicence.url;
    }, 
    htmldescription: function() {
        var converter = new Showdown.converter();
        var description = this.description;
        var htmldescription = converter.makeHtml(description); 
        return htmldescription;  
    },
    htmlinstructions: function() {
        var converter = new Showdown.converter();
        var instructions = this.instructions;
        var htmlinstructions = converter.makeHtml(instructions); 
        return htmlinstructions;  
    },
});
