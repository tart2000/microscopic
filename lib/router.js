Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { 
        //return Meteor.subscribe('projects'); 
        //return Meteor.subscribe('hubs');
        //return Meteor.subscribe('licences');
    },
    onStop: function(){
            Alert.clear();
        }
});

Router.map(function() { 
    this.route('homePage', {path: '/',
         waitOn: function() { return Meteor.subscribe('hubs') }
    });

    this.route('projectsList', {
        path:'/projects',
        waitOn: function() { 
            return [
                Meteor.subscribe('allProjects'),
                Meteor.subscribe('mainProjectPhoto')
            ]
        }
    });

    this.route('usersList', {
        path:'/community',
        waitOn: function() { 
            return [Meteor.subscribe('usersData'), Meteor.subscribe('allUserPhotos')]; 
        },
        data: function() { 
            return Meteor.users.find(); 
        },
    });

    /* Change this! */
    this.route('projectPage', { 
        path: '/projects/:_id', 
        waitOn: function() {
            return [
                Meteor.subscribe('comments', this.params._id), 
                Meteor.subscribe('singleProject', this.params._id),
                Meteor.subscribe('singleProjectPhotos', this.params._id), 
                Meteor.subscribe('allUserPhotos'),
                Meteor.subscribe('commentedUsers'),
                Meteor.subscribe('teams', this.params._id), 
            ]; 
        },
        data: function() { 
            return Projects.findOne(this.params._id); 
        },
    });


    this.route('projectSubmit', { 
        path: '/submit', 
    });

    /* Change this! */
    this.route('projectEdit', {
        path: '/projects/:_id/edit',
        waitOn: function() { 
            return [
                Meteor.subscribe('singleProject', this.params._id),
                Meteor.subscribe('licences'), 
                Meteor.subscribe('singleProjectPhotos', this.params._id), 
                Meteor.subscribe('usersData'),
                Meteor.subscribe('teams')
            ]; 
        },
        data: function() { 
            return Projects.findOne(this.params._id); 
        }, 
        onBeforeAction: function() {
            // I need to add here permissions for accessing the page (only for core team members + facilitator)
        }
    });

    this.route('hubPage', {
        path:'/hubs/:_id',
        waitOn: function() { 
            return [Meteor.subscribe('hubUsers', this.params._id), Meteor.subscribe('hubUserPhotos', this.params._id)]; 
        },
        data: function() { 
            return Hubs.findOne(this.params._id); 
        },
    });

    this.route('hubEdit', {
        path:'/hubs/:_id/edit', 
        waitOn: function() {
            return [];
        },
        data: function() {
            return Hubs.findOne(this.params._id);
        },
    });

    this.route('hubsList', {
        path:'/hubs',
    });

    this.route('aboutPage', { 
        path: '/about',
    });

    this.route('userProfile', {
        path: '/users/:_id',
        waitOn: function() { return [Meteor.subscribe('singleUser', this.params._id), Meteor.subscribe('singleUserPhoto', this.params._id)]; },
        data: function() { return Meteor.users.findOne(this.params._id); }
    });     

    this.route('modifyUserProfile', {
        path: '/users/:_id/edit',
        waitOn: function() { 
            return [
                Meteor.subscribe('singleUser', this.params._id), 
                Meteor.subscribe('singleUserPhoto', this.params._id),
                Meteor.subscribe('subscribeToHub')
            ]; 
        },
        data: function() { return Meteor.users.findOne(this.params._id); },
        onBeforeAction: function() {
            var currentUser = Meteor.user();

            if (!currentUser) {
                alert('Dude, this is not your profile! Go create your own!');
                Router.go('homePage');
                return;
            }

            if (currentUser._id !== this.params._id) {
                alert('Dude, this is not your profile! Go back to your own!');
                Router.go('userProfile', {_id: currentUser._id});
                return;
            }
        }
    });     

});

Router.onBeforeAction('loading');
