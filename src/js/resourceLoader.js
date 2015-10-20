// load resources (images)
export default {

    images: {},


    loadImages: function(sources, callback) {

        var loadedImages = 0;
        var numImages = 0;

        for (var src in sources) {
            numImages++;
        }

        for (var src in sources) {
            this.images[src] = new Image();
            this.images[src].onload = function(){
                if (++loadedImages >= numImages) {
                    callback(this.images);
                }
            }
            this.images[src].src = sources[src];
        }
    } 
};