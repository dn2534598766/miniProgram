function getDistance(lat1,lng1,lat2,lng2){
  const R = 6378137
  let radLat1 = toRadians(lat1)
  let radLat2 = toRadians(lat2)
  let deltalat = radLat1-radLat1
  let deltaLng=toRadians(lng1)-toRadians(lng2)
  let dis=2*R*Math.asin(Math.sqrt(Math.pow(Math.sin(deltalat/2),2)+
  Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(deltaLng/2),2)))
  return dis
}
function toRadians(d){
  return d*Math.PI/180
}
module.exports.getDistance=getDistance