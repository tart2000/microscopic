if (Hubs.find().count() === 0) {

	var now = new Date().getTime();

	/* The user data */
	var tinkyId = Meteor.users.insert({
		profile: { 
			name: 'Tinky Winky',
			email: 'tinkywinky@teletubbyland.ln',
			thumlink: 'public/images/tinkywinky.jpg'
		}
	});
	var tinky = Meteor.users.findOne(tinkyId);

	var laaId = Meteor.users.insert({
		profile: { 
			name: 'Laa Laa',
			email: 'laalaa@teletubbyland.ln',
			thumblink: 'public/images/laalaa.jpg'
		}
	});
	var laa = Meteor.users.findOne(laaId);

	/* The hub data */
    var montrealID = Hubs.insert({
        name:'Montreal',
        museum: 'Museum of Fine Arts',
        thumblink:'/hubs/artsmtl.png',
    });
    var montreal = Hubs.findOne(montrealID);

    Hubs.insert({
        name:'Geneve',
        museum: 'Musée d art et d histoire de Genève',
        thumblink:'/hubs/genevehistoire.png',
    });
    Hubs.insert({
        name:'Derby',
        museum: 'Derby Silk Museum',
        thumblink:'/hubs/derbysilk.png',
    });
    Hubs.insert({
        name:'Nantes',
        museum: 'Museum of natural history',
        thumblink:'/hubs/naturenantes.png',
    });
    Hubs.insert({
        name:'Arles',
        museum: 'Musée départemental d Arles antique avec le Museon Arlaten ',
        thumblink:'/hubs/arlesantique.png',
    });
    Hubs.insert({
        name:'Lille',
        museum: 'Musée d Histoire Naturelle et de Géologie de Lille',
        thumblink:'/hubs/geolille.png',
    });
    Hubs.insert({
        name:'Saint-Etienne',
        museum: 'Musée d art et d industrie de Saint-Etienne',
        thumblink:'/hubs/stetienne.png',
    });

    /* The Project Data */
    var omgID = Projects.insert({ 
        title: 'OMG',
        baseline:'Oh My Gallery',
        body: 'Le projet Oh My Gallery ! est un portail de découverte interactif qui ouvre le périmètre géographique et temporel des œuvres de la Galerie de Temps du Louvre-Lens. Autour de la Madeleine à la veilleuse de Georges de La Tour, le prototype propose un voyage virtuel à travers l\'espace et le temps par bonds successifs. Le visiteur crée son propre musée imaginaire.',
        author: tinky.profile.name,
        authorID: tinkyId,
        hubID:montrealID,
        hub: montreal,
        thumblink: 'public/images/SWAG.jpg',
        commentsCount: 0,
        tags:[],
        sumbitted: now - 12 * 3600 * 1000
    }); 

    var exploraID = Projects.insert({ 
        title: 'Explora',
        baseline:'Mix li Nord',
        body: 'Avec l\'Explora, découvrez une nouvelle expérience du musée et de la région. A la fois sensoriel et interactif, Explora vous invite à poursuivre votre expérience muséale sur le territoire du Nord-Pas-de-Calais. Soyez curieux, et interagissez, c\'est vous qui choisissez votre destination!',
        author: laa.profile.name,
        authorID: laaId,
        hubID:montrealID,
        hub: montreal,
        thumblink: 'public/images/SWAG.jpg',
        commentsCount: 0,
        tags:[],
        sumbitted: now - 10 * 3600 * 1000
    });

    /* The teams data */
    Teams.insert({
    	projectID: omgID,
    	userID: laaId,
    	user: laa.profile.name,
    	thumblink: laa.profile.thumblink
    });

    Teams.insert({
    	projectID: omgID,
    	userID: tinkyId,
    	user: tinky.profile.name,
    	thumblink: tinky.profile.thumblink
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

    /* The project photos */
    PrjPhotos.insert({
    	projectID: omgID,
    	thumlink: 'public/images/SWAG.jpg'
    });

    /* The Licences */
    Licences.insert({
    	name: 'CCBY',
    	thumlink: 'public/images/ccby.gif',
    	url: 'http://creativecommons.org/licenses/by/2.0/',
    	projectID: omgID
    });

    /* The Instructions */
    Instructions.insert({
    	title: 'STEP 1',
    	projectID: omgID,
    	thumlink: 'public/images/SWAG.jpg',
    	body: 'The 1st step',
    	rank: 1
    });

    Instructions.insert({
    	title: 'STEP 2',
    	projectID: omgID,
    	thumlink: 'public/images/SWAG.jpg',
    	body: 'The 2nd step',
    	rank: 1
    })

} 
