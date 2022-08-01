class tree {
    element;
    lat;
    long;
    x;
    y;
    constructor(element) {
        this.element = element;
    }
}

class site {
    trees = [];
    maxLong;
    minLong;
    maxLat;
    minLat;
    drawingWidth;
    drawingHeight;
    latitudes;
    longitudes;
    canvasMeterWidth;
    constructor() {
        this.trees[1] = new tree(document.getElementById("tree1"));
        this.trees[2] = new tree(document.getElementById("tree2"));
        this.trees[3] = new tree(document.getElementById("tree3"));
    }
    initSite() {
        this.drawingWidth = canvas.width - 2 * canvasMargin;
        this.drawingHeight = canvas.height - 2 * canvasMargin;
        this.maxLong = Math.max(theSite.trees[1].long, theSite.trees[2].long, theSite.trees[3].long);
        this.minLong = Math.min(theSite.trees[1].long, theSite.trees[2].long, theSite.trees[3].long);
        this.maxLat = Math.max(theSite.trees[1].lat, theSite.trees[2].lat, theSite.trees[3].lat);
        this.minLat = Math.min(theSite.trees[1].lat, theSite.trees[2].lat, theSite.trees[3].lat);
        this.canvasMeterWidth = latLong2Meter(this.maxLat, this.maxLong, this.minLat, this.minLong);
        log("___________canvasMeterWidth = " + this.canvasMeterWidth);
    }
    position2Pixels(lat, long) {
        x = Math.trunc(canvasMargin + (long - this.minLong) * this.drawingWidth / (this.maxLong - this.minLong));
        y = Math.trunc(canvasMargin + (lat - this.minLat) * this.drawingHeight / (this.maxLat - this.minLat));
        return [x, y];
    }
}
