Meteor.subscribe('hubs');
Meteor.subscribe('licences');

if(Meteor.isClient) {
  Accounts.ui.config({ passwordSignupFields: 'USERNAME_AND_EMAIL' });
};

Template._loginButtonsLoggedIn.rendered = function (){
    $( "#login-buttons-open-change-password" ).before( "<div id='profileLink' class='btn btn-default btn-block'>Your profile</div>" );
};
Template._loginButtonsLoggedIn.events({
    'click #profileLink': function(event) {
        event.stopPropagation();
        $("#login-dropdown-list").toggleClass("open");
        Router.go('userProfile', {_id: Meteor.userId});
    }
});
