import "./mathsMethods.js";
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
        //Global init
        let lat = 0;
        let long = 0;
        let theSite;
        let canvas;
        let context;
        const canvasMargin = 30;
        let numTrees = 0;
        let northmostTree;
        let eastmostTree;
        let westmostTree;

        function initPage() {
                log("dflskjfldsjk");
            theSite = new site();
            canvas = document.getElementById("campsSite");
            context = canvas.getContext("2d");
            setPosition(1);
            setPosition(2);
            setPosition(3);
        }
        function setPosition(tree) {
            //initPage();
            theSite.trees[2].lat = 59.85882;
            theSite.trees[1].lat = 59.85889;
            theSite.trees[3].lat = 59.85881;
            theSite.trees[2].long = 17.64346;
            theSite.trees[1].long = 17.64343;
            theSite.trees[3].long = 17.64341;

            //            theSite.trees[1].lat = 59.8305845;
            //            theSite.trees[2].lat = 59.8305651;
            //            theSite.trees[3].lat = 59.8307833;
            //            theSite.trees[1].long = 17.6537908;
            //            theSite.trees[2].long = 17.653771;
            //            theSite.trees[3].long = 17.6536591;

            //navigator.geolocation.getCurrentPosition(getPosition);
            //theSite.trees[tree].lat = lat;
            //theSite.trees[tree].long = long;
            log("Tree " + tree + ": latitude: " + theSite.trees[tree].lat + ", longitude: " + theSite.trees[tree].long);
            //if (lat != 0) {
            drawTrees();
            //}
        }
        function getPosition(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
        }
        function drawTrees() {
            numTrees++;
            if (numTrees == 1) {
                x = canvas.width / 2;
                y = canvas.height / 2;
                drawCircle(x, y, "1")
            }
            if (numTrees == 2) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                x = canvas.width / 2;
                y = canvas.height / 7;
                drawCircle(x, y, "1")
                context.beginPath();
                context.moveTo(x,y);
                x = canvas.width / 2;
                y = canvas.height / 7 * 6;
                drawCircle(x, y, "2")
                context.lineTo(x, y);
                context.closePath();
                context.stroke();
            }
            if (numTrees > 2) {
                theSite.initSite();
                context.clearRect(0, 0, canvas.width, canvas.height);
                arrangeTrees();
                drawTree(northmostTree);
                drawTree(eastmostTree);
                drawTree(westmostTree);
                drawIdealTentPosition();
                //setInterval(updateCurrentPosition, 2000);
            }
        }
        function drawTree(tree) {
            point = theSite.position2Pixels(theSite.trees[tree].lat, theSite.trees[tree].long);
            theSite.trees[tree].x = point[0];
            theSite.trees[tree].y = point[1];
            drawCircle(theSite.trees[tree].x, theSite.trees[tree].y, tree);
        }
        function drawCircle(x, y, text) {
            context.beginPath();
            context.arc(x, y, 10, 0, 2 * Math.PI);
            context.stroke();
            context.fillText(text, x, y)
            log("x =" + x + ", y = " + y);
        }
        function updateCurrentPosition() {
            //navigator.geolocation.getCurrentPosition(getPosition);
            lat = 59.85881;
            long = 17.6434286;
            point = theSite.position2Pixels(lat, long);

            context.beginPath();
            context.arc(point[0], point[1], 10, 0, 2 * Math.PI);
            context.stroke();
            context.fillText("c", x, y)
            document.getElementById("currentPosition").innerHTML = "x = " + point[0] + "     y = " + point[1] + "<br>" +
                "Current latitude: " + lat + ", longitude: " + long;

        }
        function drawIdealTentPosition() {
            const fermatPoint = getFermatPoint(theSite.trees[1].x, theSite.trees[1].y, theSite.trees[2].x, theSite.trees[2].y, theSite.trees[3].x, theSite.trees[3].y);
            fermatPointX = fermatPoint[0];
            fermatPointY = fermatPoint[1];
            drawCircle(fermatPointX, fermatPointY, "f");
            log("fermatPoint=" + fermatPoint);
            const closestTree = getClosestTree(fermatPoint);
            log("closestTree =" + closestTree);
            tentSideAsPixel = 4.1 / theSite.canvasMeterWidth * canvas.width;
            log("tentSideAsPixel  = " + tentSideAsPixel);

            // tentside = 4.1 * canvas.width / theSite.canvasMeterWidth;
            h = Math.sin(60 * Math.PI / 180) * tentSideAsPixel; //h is the height of the equilateral triangle
            v1 = Math.atan(fermatPointX / fermatPointY); // The angle between the line fermatPoint-closestTree and the x=0 of the canvas
            //v1 = 1;
            log("v1 :" + v1*180/Math.PI);
            turn = 1;
            if (v1 >= 0 && v1 < 90) { xturn = 1; yturn = 1; }
            if (v1 >= 90 && v1 < 180) { xturn = -1; yturn = 1; }
            if (v1 >= 180 && v1 < 270) { xturn = -1; yturn = -1; }
            if (v1 >= 270 && v1 < 360) { xturn = 1; yturn = -1; }
            a1 = Math.trunc(fermatPointX + Math.cos(v1) * h);
            b1 = Math.trunc(fermatPointY + Math.sin(v1) * h);
            a2 = Math.trunc(fermatPointX + Math.sin(v1) * tentSideAsPixel / 2);
            b2 = Math.trunc(fermatPointY - Math.cos(v1) * tentSideAsPixel / 2);
            a3 = Math.trunc(fermatPointX - Math.sin(v1) * tentSideAsPixel / 2);
            b3 = Math.trunc(fermatPointY + Math.cos(v1) * tentSideAsPixel / 2);
            drawCircle(a1, b1, "a1="+a1);
            drawCircle(a2, b2, "a2="+a2);
            drawCircle(a3, b3, "a3="+a3);

            //   a1+--+
            //   b1++--
            //   a2++--
            //   b2-++-
            //   a3--++
            //   b3+--+

            //            let path = new Path2D();
            //            path.moveTo(fermatPointX, fermatPointY);
            //            path.lineTo(a1, b1);
            //            path.lineTo(a2, b2);
            //            context.fill(path);
            //
            //            context.beginPath()
            //            context.moveTo(fermatPointX, fermatPointY);
            //            context.lineTo(a1, b1);
            //            context.lineTo(a2, b2);
            //            context.stroke();

            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(a1, b1);
            ctx.lineTo(a2, b2);
            ctx.lineTo(a3, b3);
            ctx.fillStyle = 'green';
            ctx.fill();

            log("mmmmukly" + a1 + ":" + b1);
            log("mmmmukly" + a2 + ":" + b2);

        }
        function arrangeTrees() {
            let longitudes = [theSite.trees[1].long, theSite.trees[2].long, theSite.trees[3].long];
            longitudes.sort(function (a, b) { return a - b });
            let latitudes = [theSite.trees[1].lat, theSite.trees[2].lat, theSite.trees[3].lat];
            latitudes.sort(function (a, b) { return a - b });
            northmostTree = getTreeIndexFromValue(latitudes[2]);
            eastmostTree = getTreeIndexFromValue(longitudes[0]);
            westmostTree = getTreeIndexFromValue(longitudes[2]);
        }
        function getTreeIndexFromValue(value) {
            for (let i = 1; i < theSite.trees.length + 1; i++) {
                if (theSite.trees[i].lat == value)
                    return i;
                if (theSite.trees[i].long == value)
                    return i;
            }
        }
        function getClosestTree(point) {
            const distances = [];
            distances[0] = euclideanDistance(point[0], theSite.trees[1].x, point[1], theSite.trees[1].y);
            distances[1] = euclideanDistance(point[0], theSite.trees[2].x, point[1], theSite.trees[2].y);
            distances[2] = euclideanDistance(point[0], theSite.trees[3].x, point[1], theSite.trees[3].y);
            distances.sort(function (a, b) { return b + a });
            for (let i = 0; i < 3; i++) {
                if (distances[i] == distances[0]) {
                    return i + 1;
                }
            }
        }


        function log(message) {
            document.getElementById("log").innerHTML += message + "<br>";
        }
