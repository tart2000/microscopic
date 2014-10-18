Template.homePage.helpers({ 
    hubs: function() {
        return Hubs.find(); 
    }, 
    fourProjects: function() {
        return Projects.find({},{limit:4});
    },
    sixUsers: function() {
        return Meteor.users.find({},{limit:6});
    },
});