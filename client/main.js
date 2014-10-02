Meteor.subscribe('hubs');
Meteor.subscribe('licences');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template._loginButtonsLoggedInDropdown.rendered = function (){
    $( "#login-buttons-open-change-password" ).before( "<a href='#' id='profileLink' class='btn btn-default btn-block'>Your profile</a>" );
};
Template._loginButtonsLoggedInDropdown.events({
    'click #profileLink': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        Router.go('userProfile', {_id: Meteor.userId});
    }
});