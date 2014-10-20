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
        Session.get('commentAdded');
        return Comments.find({}, {sort: {submitted: -1}}); 
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
    canEdit: function() {
         var currentUser = Meteor.user();

        var inTeam = Teams.findOne({"userID": currentUser._id, "projectID": this._id}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
        var projectAuthor = this.author;

        if ( (projectAuthor == currentUser._id) || (inTeam) || (Roles.userIsInRole(currentUser, ['admin']))  )  
            return true;
        
    },
    teamMembers: function() {
        return Teams.find();
    },
    getUser: function(userID) {
        return Meteor.users.findOne(userID);
    },
    getAuthor: function() {
        var author = Meteor.users.findOne(this.author);

        if (!author.profile)
            return author.username;

        if (!author.profile.name)
            return author.username;

        return author.name;
    }, 
});
