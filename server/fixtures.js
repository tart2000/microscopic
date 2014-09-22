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
        edition:'Leman',
        tags:[],
    }); 

    Projects.insert({ 
        title: 'The Meteor Book',
        baseline : 'Defenitely something worth looking into!',
        author: 'John Good',
        edition:'Leman',
        tags:[],
    }); 


}
