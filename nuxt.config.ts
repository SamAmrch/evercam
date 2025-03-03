// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/leaflet',
    '@nuxtjs/supabase'
  ],
  plugins: [
    '~/plugins/vuetify'
  ],
  css: [
    'vuetify/styles'
  ],
  build: {
    transpile: ['vuetify']
  },
  supabase:{
    redirectOptions: {
    login: '/',
    callback: '/cameras',
    exclude: ['/register', '/login']
  }
}
  
})
