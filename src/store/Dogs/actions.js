import axios from 'axios';
import Vue from 'vue';


export default {
  
  GET_BREEDS() {
    return new Promise(resolve => {
      axios.get('https://dog.ceo/api/breeds/list/all')
      .then(_response => {
        var data = _response.data.message;
        var breeds = [];
        
        Object.keys(data).forEach((key, value) => {
          var breedName = key[0].toUpperCase() + key.substring(1);
          
          if (data[key].length){
            data[key].forEach((subBreed) => {
              subBreed = subBreed[0].toUpperCase() + subBreed.substring(1)
              breeds.push({
                key: `${breedName}-${subBreed}`,
                value: `${breedName}-${subBreed}`,
                text: `${subBreed} ${breedName}`
              });
            })  
          } else {
            breeds.push({
              key: breedName,
              value: breedName,
              text: breedName
            });
          }
        })

        resolve(breeds);
      })
    })
  },

  GET_BREED_IMG({}, _payload) {
    return new Promise(resolve => {

      let name = _payload.breedName.split('-');

      axios.get(`https://dog.ceo/api/breed/${name.join('/')}/images/random`)
      .then(_response => {
        resolve(_response.data.message)
      })

    })
  }

}
