Meteor.subscribe('hubs');
Meteor.subscribe('licences');

if(Meteor.isClient) {
  Accounts.ui.config({ passwordSignupFields: 'USERNAME_AND_EMAIL' });
};

Template._loginButtonsLoggedIn.rendered = function (){
    $( "#login-buttons-open-change-password" ).before( "<a href='#' id='profileLink' class='btn btn-default btn-block'>Your profile</a>" );
};
Template._loginButtonsLoggedIn.events({
    'click #profileLink': function(event) {
        event.stopPropagation();
        $("#login-dropdown-list").toggleClass("open");
        Router.go('userProfile', {_id: Meteor.userId});
    }
});
