<template>
  <section>
    <div class="row amicao_name">

      <sui-card class="centered">
        <sui-card-content>
          <sui-card-header class="amicao_name">{{ nameToShow }}</sui-card-header>
        </sui-card-content>
        <sui-image :src="breedImg" />
      </sui-card>

    </div>
  </section>
</template>

<script>

export default {
  name: 'ShowDog',
  props: ['breedToShow', 'nameToShow'],
  watch: {
    'breedToShow': function(newVal) {
    	this.get_breed_img(newVal);
    },
	},
  data() {
    return {
      breedImg: 'https://media.istockphoto.com/vectors/little-cartoon-dog-sitting-on-the-floor-vector-id483263267'
    };
  },
  methods: {
    get_breed_img(breed){
      let vm = this;
      
      let payload = {
        breedName: breed.toLowerCase(),
      }

      this.$store.dispatch('Dogs/GET_BREED_IMG', payload)
        .then((_response) => {
          vm.breedImg = _response;
        });
    },
  },
};
</script>


<style scoped>

  
  .centered.ui.card {
    box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.75);
  }

  .centered.ui.card .content .amicao_name {
    font: 50px var(--font);
    color: var(--font-color);
  }

  section {
    text-align: center;
  }

</style>
