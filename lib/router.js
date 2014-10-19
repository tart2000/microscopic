Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { 
    },
    onStop: function(){
            Alert.clear();
        }
});

Router.map(function() { 
    this.route('homePage', {path: '/',
         waitOn: function() { 
            return [
                Meteor.subscribe('hubs'),  
                /* ici il faudrait en appeler que 4 j'imagine */
                Meteor.subscribe('allProjects'), 
                Meteor.subscribe('mainProjectPhoto'),
                /* et là, que 6 */
                Meteor.subscribe('usersData'), 
                Meteor.subscribe('allUserPhotos')
            ]
        }
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
                Meteor.subscribe('teams', this.params._id)
            ]; 
        },
        data: function() { 
            return Projects.findOne(this.params._id); 
        }, 
        onBeforeAction: function() {
           var currentUser = Meteor.user();

           if (!currentUser) {
                alert('Dude, this is not your project! Go create your own!');
                Router.go('projectSubmit');
                return;
            }

            var inTeam = Teams.findOne({"userID": currentUser._id, "projectID": this.params._id}, {$or: [{"role" : "core"},{"role" : "facilitator"}]});
            var projectAuthor = Projects.findOne({_id: this.params._id}).author;

            if ( (projectAuthor !== currentUser._id) && (!inTeam) ) { 
                alert('Dude, this is not your project! Go create your wn!');
                Router.go('projectSubmit');
                return;
            }
        }
    });

    this.route('hubPage', {
        path:'/hubs/:_id',
        waitOn: function() { 
            return [
                Meteor.subscribe('hubUsers', this.params._id), 
                Meteor.subscribe('hubUserPhotos', this.params._id)
            ]; 
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

    this.route('aboutPage', { 
        path: '/about',
    });

    this.route('userProfile', {
        path: '/users/:_id',
        waitOn: function() { 
            return [
                Meteor.subscribe('singleUser', this.params._id), 
                Meteor.subscribe('singleUserPhoto', this.params._id)
            ]; 
        },
        data: function() { 
            return Meteor.users.findOne(this.params._id); 
        }, 
        after: function () {
            $('body').scrollTop(0);
        },
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
