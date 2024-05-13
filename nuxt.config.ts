import {defineNuxtConfig} from "nuxt/config";


export default defineNuxtConfig({

  modules: [
    '@nuxt/image',
    'nuxt-quasar-ui',
    "@nuxtjs/i18n",
    "nuxt-translation-manager",
    "nuxt-scheduler"
  ],
  
  
  
  i18n: {
    langDir:"locales",
    strategy:"no_prefix",
   locales:[
    {
      code:'en',
      name:'English',
      iso: 'en-US',
      file: 'en-US.json',

      

    },
    {
      code:'es',
      name:'Spanish',
      iso: 'es-ES',
      file: 'es-ES.json',


    }
   ]
  },

  devtools: { enabled: true },
  
  
  css: ['~/assets/main.css'],

  imports:{
    dirs:['types/*.ts']
  },


  quasar:{
    plugins:["Notify","Dialog",],
    
  
    config: {

      
    
      brand: {
        primary: '#118AB2',
        secondary: '#EEE5E9',
        accent: '#9C27B0',
        negative:'#C2714F',
        dark: '#1d1d1d',
        'dark-page': '#121212',
        positive: '#ccc2c6',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    }
  },



 
})

