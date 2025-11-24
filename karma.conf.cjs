// karma.conf.cjs
module.exports = function (config) {
  config.set({
    // Frameworks
    frameworks: ['jasmine', 'vite'],

    // Archivos
    files: [
      { pattern: 'src/**/*.test.jsx', type: 'module', watched: false, served: false }
    ],

    // Preprocesadores
    preprocessors: {
      'src/**/*.test.jsx': ['vite']
    },

    // Plugins explícitos para evitar el error "not registered"
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-vite'
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false, // Cambiamos a false para que no se quede pegado si solo quieres probar una vez
    browsers: ['ChromeHeadless'], // Usamos Headless para que sea más rápido y no abra ventanas
    singleRun: true, // Ejecutar una vez y terminar
  })
}