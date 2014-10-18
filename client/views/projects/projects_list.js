Template.projectsList.rendered = function() {
    Session.set("projectSearch", '');
};

Template.projectsList.helpers({ 
    projects: function() {
        if (Session.get("projectSearch")) {
            return Projects.find({hub: Session.get("projectSearch")});    
        } else {
            return Projects.find();
        };
    },
});

Template.projectsList.events({
    'click .hub-selector': function(e) {
        var hubname = $(e.target).text();
        $(e.target).parent().parent().find('.active').toggleClass('active'); 
        $(e.target).parent().toggleClass('active');
        Session.set("projectSearch", hubname);
    }, 
    'click .all-pro': function(e) {
        Session.set("projectSearch", '');
        $(e.target).parent().parent().find('.active').toggleClass('active'); 
        $(e.target).parent().toggleClass('active');
    },
});