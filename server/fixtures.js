if (Projects.find().count() === 0) {

    Projects.insert({ 
        title: 'Telescope',
        baseline:'something more than awesome',
        author: 'Sacha Grief',
        edition:'Montreal',
        tags:[],
    }); 

    Projects.insert({ 
        title: 'Meteor',
        baseline : 'building awesome apps easily',
        author: 'Tom Coleman',
        edition:'Nantes',
        tags:[],
    }); 

    Projects.insert({ 
        title: 'PingPong',
        baseline : 'a one-way trip to funky town',
        author: 'Tom Coleman',
        edition:'Lille',
        tags:[],
    }); 

    Projects.insert({ 
        title: 'The Meteor Book',
        baseline : 'Defenitely something worth looking into!',
        author: 'John Good',
        edition: 'Montreal',
        tags:[],
    }); 


} 

if (Hubs.find().count() === 0) {
    Hubs.insert({
        name:'Montreal',
        museum: 'Museum of Fine Arts',
        thumblink:'/hubs/artsmtl.png',
    });
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
}
