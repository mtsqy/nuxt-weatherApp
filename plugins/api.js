export default function ({ $config, $http, store }, inject) {
    inject('openWeather', (coord) => {
        let weatherData = $http.$get(`${$config.apiURL}?appid=${$config.token}&lat=${coord.lat}&lon=${coord.lon}`)
        return weatherData
    })
}