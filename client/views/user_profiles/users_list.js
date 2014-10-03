Template.usersList.rendered = function() {
    Session.set("userSearch", '');
};

Template.usersList.helpers({ 
    users: function() {
        if (Session.get("userSearch")) {
            return Meteor.users.find({'profile.hub': Session.get("userSearch")});    
        } else {
            return Meteor.users.find();
        };
    },
});

Template.usersList.events({
    'click .hub-selector': function(e) {
        var hubname = $(e.target).text();
        $(e.target).parent().parent().find('.active').toggleClass('active'); 
        $(e.target).parent().toggleClass('active');
        var hubID = Hubs.findOne({name: hubname})._id;
        Session.set("userSearch", hubID);
    }, 
    'click .all-pro': function(e) {
        Session.set("userSearch", '');
        $(e.target).parent().parent().find('.active').toggleClass('active'); 
        $(e.target).parent().toggleClass('active');
    },
});
