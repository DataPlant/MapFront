const url = 'http://localhost:4000/pins'

class PinModel {
    static all() {
        return fetch(url)
        .then((response) => {
            return response.json()
        })
        .catch((err) => {
            console.log(err);
        })
    }
    static show(pinId) {
     return fetch(`${url}/${pinId}`)
         .then((response) => {
             return response.json()
         })
     }
 }
 
 export default PinModel