<template>
  <div id="app">
    <div class="ui two column grid">
      <div class="row">
        <div class="four wide column">
          <SelectDog :selectedBreed="selectedBreed" :selectedName="selectedName"/>
        </div>
        <div class="twelve wide column">
          <ShowDog :breedToShow="breedToShow" :nameToShow="nameToShow"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectDog from './components/SelectDog';
import ShowDog from './components/ShowDog';

export default {
  name: 'App',
  components: {
    SelectDog,
    ShowDog,
  },
  data() {
    return {
      breedToShow: '',
      nameToShow: 'Amicão',
    }
  },
  methods: {
    selectedBreed(breed) {
      this.breedToShow = breed;
    },
    selectedName(name) {
      this.nameToShow = name;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Bahianita|Montserrat|Mountains+of+Christmas|Permanent+Marker|Shadows+Into+Light&display=swap');

html body {
  background-color: #d9d9d9;
  max-width: 900px;
  margin: auto;
}

#app {
  margin-top: 50px;
}

:root {
  --font: 'Bahianita';
  --font-color: 'black';
}
</style>
