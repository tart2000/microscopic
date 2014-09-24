if (Projects.find().count() === 0) {

    Projects.insert({ 
        title: 'Telescope',
        baseline:'something more than awesome',
        author: 'Sacha Grief',
        tags:[],
    }); 

    Projects.insert({ 
        title: 'Meteor',
        baseline : 'building awesome apps easily',
        author: 'Tom Coleman',
        tags:[],
    }); 

    Projects.insert({ 
        title: 'PingPong',
        baseline : 'a one-way trip to funky town',
        author: 'Tom Coleman',
        tags:[],
    }); 

    Projects.insert({ 
        title: 'The Meteor Book',
        baseline : 'Defenitely something worth looking into!',
        author: 'John Good',
        tags:[],
    }); 


} 

if (Hubs.find().count() === 0) {
    Hubs.insert({
        name:'Montreal',
        projects:[],
    });
    Hubs.insert({
        name:'Geneve',
        projects:[],
    });
    Hubs.insert({
        name:'Derby',
        projects:[],
    });
    Hubs.insert({
        name:'Nantes',
        projects:[],
    });
    Hubs.insert({
        name:'Arles',
        projects:[],
    });
    Hubs.insert({
        name:'Lille',
        projects:[],
    });
    Hubs.insert({
        name:'Saint-Etienne',
        projects:[],
    });
}
