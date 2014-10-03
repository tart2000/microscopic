Projects = new Meteor.Collection('projects');

Projects.allow({
  update: function() {
    return true;
  }
});