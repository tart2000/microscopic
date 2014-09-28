Meteor.subscribe('hubs');
Meteor.subscribe('licences');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});