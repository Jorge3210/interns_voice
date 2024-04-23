import {defineNuxtConfig} from "nuxt/config";


export default defineNuxtConfig({

  modules: [
    '@nuxt/image',
    'nuxt-quasar-ui',
    "@nuxtjs/i18n",
    "nuxt-translation-manager",
    "@nuxt/content",
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
  content:{

  },


  
  devtools: { enabled: true },
  
  
  css: ['~/assets/main.css'],
 /* postcss: {
    plugins: {
      tailwindcss: {},
     autoprefixer: {},
    },
  },*/

  quasar:{
    config: {
    
      brand: {
        primary: '#118AB2',
        secondary: '#EEE5E9',
        accent: '#9C27B0',
  
        dark: '#1d1d1d',
        'dark-page': '#121212',
  
        positive: '#ccc2c6',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    }
  }

  
  
})