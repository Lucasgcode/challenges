<template>
  <section>
    <div class="row">
      
      <sui-form @submit.prevent="saveForm">

        <sui-form-field>
          <label for="current-name">Qual o nome do seu amicão?</label>
          <input id="current-name" type="text" v-model="form.currentName" placeholder="Nome">
        </sui-form-field>

        <sui-form-field>
          <sui-dropdown
            :options="breeds"
            placeholder="Selecione uma raça"
            search
            selection
            v-model="form.currentBreed"
          />
        </sui-form-field>

        <sui-form-field>
          <sui-dropdown
            text="Escolha uma fonte"
            selection
          >
            <sui-dropdown-menu>
              <sui-dropdown-item v-for="(font, idx) in fonts"
                @click="chooseFont(font)"
                class="fonts"
                :key="idx"
                :style="`font-family: ${font}`">
                  {{ form.currentName.length ? form.currentName : font }}
              </sui-dropdown-item>
            </sui-dropdown-menu>
          </sui-dropdown>
        </sui-form-field>

        <sui-form-field>
          <sui-dropdown
            :options="colors"
            placeholder="Selecione uma cor"
            selection
            v-model="form.currentColor"
          />
        </sui-form-field>

        <sui-button type="submit">Salvar!</sui-button>

      </sui-form>

      <div class="salvo" v-if="info_salvas">
        <p>Todas as informações foram salvas!</p>
        <p>Dia: {{ data }}</p>
        <p>Horas: {{ horas }}</p>
      </div>

    </div>
  </section>
</template>


<script>


export default {
  name: 'SelectDog',
  props: ['selectedBreed', 'selectedName'],
  data() {
    return {
      form: {
        currentBreed: null,
        currentName: 'Amicão',
        currentColor: null,
        font: null,
        data: null,
        horas: null,
      },
      breeds: [],
      fonts: ['Bahianita', 'Montserrat', 'Mountains of Christmas', 'Permanent Marker', 'Shadows Into Light'],
      colors: [
        {
          key: 'Preto',
          text: 'Preto',
          value: 'black',
          label: { color: 'black', empty: true, circular: true },
        },
        {
          key: 'Azul',
          text: 'Azul',
          value: 'blue',
          label: { color: 'blue', empty: true, circular: true },
        },
        {
          key: 'Roxo',
          text: 'Roxo',
          value: 'purple',
          label: { color: 'purple', empty: true, circular: true },
        },
        {
          key: 'Laranja',
          text: 'Laranja',
          value: 'orange',
          label: { color: 'orange', empty: true, circular: true },
        },
        {
          key: 'Vermelho',
          text: 'Vermelho',
          value: 'red',
          label: { color: 'red', empty: true, circular: true },
        },
      ],
      dia: '',
      horas: '',
      info_salvas: false,
    };
  },
  beforeMount() {
    const vm = this;
    this.$store.dispatch('Dogs/GET_BREEDS')
      .then((_response) => {
        vm.breeds = _response;
      });
  },
  mounted() {
    this.checkLocalStorage();
  },
  watch: {
    'form.currentBreed': function (newVal) {
      this.selectedBreed(newVal);
    },
    'form.currentName': function (newVal) {
      this.selectedName(newVal.length ? newVal : 'Amicão');
    },
    'form.currentColor': function (newVal) {
      document.documentElement.style.setProperty('--font-color', newVal);
      this.form.currentColor = newVal;
    },

  },
  methods: {

    chooseFont(val) {
      document.documentElement.style.setProperty('--font', val);
      this.form.font = val;
    },

    saveForm() {
      const date = new Date();
      this.data = `${date.getDate()}/${date.getMonth()}/${date.getYear()}`;
      this.horas = `${date.getHours()}:${date.getMinutes()}`;

      this.form.data = this.data;
      this.form.horas = this.horas;

      localStorage.setItem('form', JSON.stringify(this.form));

      this.info_salvas = true;
    },

    checkLocalStorage() {
      const vm = this;
      const form = localStorage.getItem('form') ? JSON.parse(localStorage.getItem('form')) : {};
      
      Object.keys(form).forEach((key) => {
        vm.form[key] = form[key];
      });

      vm.chooseFont(vm.form.font);

      if (form.data && form.horas) {
        vm.data = vm.form.data;
        vm.horas = vm.form.horas;
        vm.info_salvas = true;
      }
    },
  },
};
</script>


<style scoped>

  .ui.selection.dropdown .menu .fonts.item {
    font-size: 20px;
  }

  .salvo {
    margin-top: 30px;
    font-size: 15px;
  }
</style>
