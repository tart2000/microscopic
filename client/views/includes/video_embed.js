Template.videoEmbed.rendered = function() {
    
};

Template.videoEmbed.helpers({
  video: function() {
    var link = this.videolink; 
    var chtemele = function(type, url) {
        switch(type) {
            case 'youtube':
                return '<iframe src="'+url+'" frameborder="0" allowfullscreen></iframe>';
            break;

            case 'vimeo':
                return '<iframe src="'+url+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            break;
        }
    }; 

    var theembed = function(link) {
        var pattern, match, position;
        var patterns = [
            {regex: /youtu\.be\/([\w\-.]+)/, type: 'youtube', url: '//www.youtube.com/embed/%1'},
            {regex: /youtube\.com(.+)v=([^&]+)/, type: 'youtube', url: '//www.youtube.com/embed/%2'},
            {regex: /vimeo\.com\/([0-9]+)/, type: 'vimeo', url: '//player.vimeo.com/video/%1'},
            {regex: /vimeo\.com\/(.*)\/([0-9]+)/, type: 'vimeo', url: '//player.vimeo.com/video/%2'}
        ];

        for(var i=0;i<patterns.length;i++) {
            pattern = patterns[i];

            if(match = link.match(pattern.regex)) {
                position = pattern.url.match(/%([0-9]+)/)[1];
                return chtemele(pattern.type, pattern.url.replace(/%([0-9]+)/, match[position]));
            }
        }
    };
    return theembed(link);
  }
});
