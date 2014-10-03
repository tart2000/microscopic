Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { 
        return Meteor.subscribe('projects'); 
        return Meteor.subscribe('hubs');
        return Meteor.subscribe('licences');
    },
    onStop: function(){
            Alert.clear();
        }
});

Router.map(function() { 
    this.route('homePage', {path: '/',

    });

    this.route('projectsList', {
        path:'/projects',

    });

    this.route('usersList', {
        path:'/community',
        waitOn: function() { return [Meteor.subscribe('usersData'), Meteor.subscribe('userphotos')]; },
        data: function() { 
            return Meteor.users.find(); 
        },
    });

    this.route('projectPage', { 
        path: '/projects/:_id', 
        waitOn: function() {
            return Meteor.subscribe('comments', this.params._id); 
        },
        data: function() { 
            return Projects.findOne(this.params._id); 
        },
    });

    this.route('projectSubmit', { 
        path: '/submit', 
    });

    this.route('projectEdit', {
        path: '/projects/:_id/edit',
        waitOn: function() { return [Meteor.subscribe('licences'), Meteor.subscribe('prjphotos')]; },
        data: function() { 
            return Projects.findOne(this.params._id); 
        }, 
    });

    this.route('hubPage', {
        path:'/hubs/:_id',
        data: function() { return Hubs.findOne(this.params._id); },
    });

    this.route('hubsList', {
        path:'/hubs',

    });

    this.route('aboutPage', { 
        path: '/about',

    });

    this.route('userProfile', {
        path: '/users/:_id',
        // I need to change the subscription of the photos to only the user's one
        waitOn: function() { return [Meteor.subscribe('singleUser', this.params._id), Meteor.subscribe('userphotos')]; },
        data: function() { return Meteor.users.findOne(this.params._id); }
    });     

    this.route('modifyUserProfile', {
        path: '/users/:_id/modify',
        // I need to change the subscription of the photos to only the user's one 
        waitOn: function() { return [Meteor.subscribe('singleUser', this.params._id), Meteor.subscribe('userphotos')]; },
        data: function() { return Meteor.users.findOne(this.params._id); }
    });     

});

Router.onBeforeAction('loading');
