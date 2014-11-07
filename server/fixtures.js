if (Hubs.find().count() === 0) {

	var now = new Date().getTime();

    /* The hub data */
    var montrealID = Hubs.insert({
        name:'Montreal',
        museum: 'Museum of Fine Arts',
        thumblink:'/hubs/artsmtl.png',
    });
    var montreal = Hubs.findOne(montrealID);

	/* The user data */
    var georgeID = Accounts.createUser({
        username: 'gcool',
        email: 'george.koulouris1@gmail.com',
        password: 'changethis',
        profile : { 
            hub: montrealID,
        }
    });

    var arthurID = Accounts.createUser({
        username: 'tart2000',
        email: 'tart2000design@gmail.com ',
        password: 'changethis',
        profile : { 
            hub: montrealID,
        }
    });

    Roles.addUsersToRoles(georgeID, ['admin']);
    Roles.addUsersToRoles(arthurID, ['admin']);
} 

if (Licences.find().count() === 0) {
        /* The Licences */
    Licences.insert({
        name: 'CC-0',
        thumblink: '/licences/cc0.jpg',
        url: 'http://creativecommons.org/publicdomain/zero/1.0/',
    });
    Licences.insert({
        name: 'CC-BY',
        thumblink: '/licences/ccby.png',
        url: 'http://creativecommons.org/licenses/by/2.0/',
    });
    Licences.insert({
        name:'CC-BY-SA', 
        thumblink: '/licences/ccbysa.png',
        url: 'http://creativecommons.org/licenses/by-sa/4.0/',
    })
    Licences.insert({
        name:'CC-BY-ND', 
        thumblink: '/licences/ccbynd.jpg',
        url: 'http://creativecommons.org/licenses/by-nd/4.0/',
    })
    Licences.insert({
        name:'CC-BY-NC', 
        thumblink: '/licences/ccbync.jpg',
        url: 'http://creativecommons.org/licenses/by-nc/4.0/',
    })
    Licences.insert({
        name:'CC-BY-NC-SA', 
        thumblink: '/licences/ccbyncsa.png',
        url: 'http://creativecommons.org/licenses/by-nc-sa/4.0/',
    })
    Licences.insert({
        name:'CC-BY-NC-ND', 
        thumblink: '/licences/ccbyncnd.png',
        url: 'http://creativecommons.org/licenses/by-nc-nd/4.0/',
    })
}
