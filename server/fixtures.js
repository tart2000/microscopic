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
    });

    var arthurID = Accounts.createUser({
        username: 'tart2000',
        email: 'tart2000design@gmail.com ',
        password: 'changethis',
    });

    Roles.addUsersToRoles(georgeID, ['admin']);
    Roles.addUsersToRoles(arthurID, ['admin']);

    var tinkyId = Accounts.createUser({
        username: 'tinky',
        email: 'tinkywinky@teletubbyland.ln',
        password: 'tinky',
        profile : { name : "Tinky Winky", role : 'Participant', social: {facebook: "https://www.facebook.com/tinky.winky.54738"}},
    });

     var tinky = Meteor.users.findOne(tinkyId);

    var laaId = Accounts.createUser({
        username: 'laa',
        emails: 'laalaa@teletubbyland.ln',
        password: 'asdfasdf',
        profile : { name : "Laa Laa"}, 
    });
     var laa = Meteor.users.findOne(laaId);

    var ladyId = Accounts.createUser({
        username: 'lady',
        emails: 'ladylee@gmail.com',
        password: 'asdfasdf',
        profile : { name : "Lady Lé"}, 
    });

     var lady = Meteor.users.findOne(ladyId);


    /* The Project Data */
    var omgID = Projects.insert({ 
        title: 'OMG',
        baseline:'Oh My Gallery',
        description: 'Le projet Oh My Gallery ! est un portail de découverte interactif qui ouvre le périmètre géographique et temporel des œuvres de la Galerie de Temps du Louvre-Lens. Autour de la Madeleine à la veilleuse de Georges de La Tour, le prototype propose un voyage virtuel à travers l\'espace et le temps par bonds successifs. Le visiteur crée son propre musée imaginaire.',
        author: tinkyId,
        hubID:montrealID,
        hub: 'Montreal',
        thumblink: '',
        commentsCount: 0,
        tags:[],
        sumbitted: now - 12 * 3600 * 1000
    }); 

    var exploraID = Projects.insert({ 
        title: 'Explora',
        baseline:'Mix li Nord',
        description: 'Avec l\'Explora, découvrez une nouvelle expérience du musée et de la région. A la fois sensoriel et interactif, Explora vous invite à poursuivre votre expérience muséale sur le territoire du Nord-Pas-de-Calais. Soyez curieux, et interagissez, c\'est vous qui choisissez votre destination!',
        author: laaId,
        hubID:montrealID,
        hub: 'Montreal',
        thumblink: '',
        commentsCount: 0,
        tags:[],
        sumbitted: now - 10 * 3600 * 1000
    });

    /* The teams data */
    Teams.insert({
    	projectID: omgID,
    	userID: laaId,
    	user: laa.profile.name,
    	thumblink: laa.profile.thumblink,
        role: 'core'
    });

    Teams.insert({
    	projectID: omgID,
    	userID: tinkyId,
    	user: tinky.profile.name,
    	thumblink: tinky.profile.thumblink,
        role: 'facilitator'
    });

    /* The comment data */
    Comments.insert({
    	projectID: omgID,
    	userID: laaId,
    	user: laa.profile.name,
    	thumblink: laa.profile.thumblink,
    	sumbitted: now - 10 * 3600 * 1000,
    	body: 'Amazing project, keep going!'
    });

    Comments.insert({
    	projectID: omgID,
    	userID: tinkyId,
    	user: tinky.profile.name,
    	thumblink: tinky.profile.thumblink,
    	sumbitted: now - 9 * 3600 * 1000,
    	body: 'I think ours is better though....'
    });

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
        projectID: omgID
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
