function latLong2Meter(lat1, lon1, lat2, lon2) {
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
}
function euclideanDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
function getFermatPoint(x1, y1, x2, y2, x3, y3) {
    //https://www.geogebra.org/m/jehr9rc8   Assuming all angles = 60 deg
    const A = Math.sin(Math.PI / 3);
    const a = A + Math.PI / 3;
    const f = Math.sin(A) / Math.sin(a)
    let x = Math.trunc(1 / (f * 3) * (f * (x1 + x2 + x3)));
    let y = Math.trunc(1 / (f * 3) * (f * (y1 + y2 + y3)));
    return [x, y];
}
