
Router.configure({
layoutTemplate: 'layout',
loadingTemplate: 'loading',
waitOn: function() { 
    return Meteor.subscribe('projects'); 
    return Meteor.subscribe('hubs');
},
before: function(){
    Alert.clear();
  }
});

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() { 
    this.route('homePage', {path: '/',
    });

    this.route('projectsList', {
        path:'/projects',
    });

    this.route('projectPage', { 
        path: '/projects/:_id', 
        waitOn: function() {
            return Meteor.subscribe('comments', this.params._id); },
        data: function() { return Projects.findOne(this.params._id); }
    });

    this.route('projectSubmit', { 
        path: '/submit'
    });

    this.route('projectEdit', {
        path: '/projects/:_id/edit',
        data: function() { return Projects.findOne(this.params._id); }
    });

    this.route('hubPage', {
        path:'/hubs/:_id',
        data: function() { return Hubs.findOne(this.params._id); }
    });

    this.route('hubsList', {
        path:'/hubs'
    });

    this.route('aboutPage', { 
        path: '/about'
    });    

});



Router.onBeforeAction('loading');
