
Router.configure({
layoutTemplate: 'layout',
loadingTemplate: 'loading',
waitOn: function() { return Meteor.subscribe('projects'); }
});

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() { 
    this.route('projectsList', {path: '/'});

    this.route('projectPage', { 
        path: '/projects/:_id', 
        data: function() { return Projects.findOne(this.params._id); }
    });

    this.route('projectSubmit', { 
        path: '/submit'
    });

    this.route('projectEdit', {
        path: '/projects/:_id/edit',
        data: function() { return Projects.findOne(this.params._id); }
    });

});

Router.onBeforeAction('loading');