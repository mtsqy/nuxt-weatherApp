const geoMixin = {
    beforeMount() {
        if(process.client && window) {

            navigator.geolocation.watchPosition((pos) => {
                if(this.lastCoord.lon !== pos.coords.longitude
                 && this.lastCoord.lat !== pos.coords.latitude) {
                     this.lastCoord = {
                         lon: pos.coords.longitude,
                         lat: pos.coords.latitude
                     }
                 }
            })
        }
    }

}

export default geoMixin