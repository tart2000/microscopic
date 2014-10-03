Template.usersList.rendered = function() {
    Session.set("userSearch", '');
};

Template.usersList.helpers({ 
    users: function() {
        if (Session.get("userSearch")) {
            return Meteor.users.find({hub: Session.get("projectSearch")});    
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
        console.log(hubname);
        Session.set("userSearch", hubname);
    }, 
    'click .all-pro': function(e) {
        Session.set("userSearch", '');
        $(e.target).parent().parent().find('.active').toggleClass('active'); 
        $(e.target).parent().toggleClass('active');
    },
});
