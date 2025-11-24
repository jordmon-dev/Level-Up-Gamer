// karma.conf.js
module.exports = function (config) {
  config.set({
    // Frameworks a utilizar
    frameworks: ['jasmine', 'vite'],

    // Archivos a cargar (Karma-vite se encarga de servirlos)
    files: [
      { pattern: 'src/**/*.test.jsx', type: 'module', watched: false, served: false }
    ],

    // Preprocesadores
    preprocessors: {
      'src/**/*.test.jsx': ['vite']
    },

    // Reporteros de progreso
    reporters: ['progress'],

    // Puerto (por defecto 9876)
    port: 9876,

    // Colores en el log
    colors: true,

    // Nivel de log
    logLevel: config.LOG_INFO,

    // Observar archivos y ejecutar pruebas cuando cambien
    autoWatch: true,

    // Navegador (Chrome)
    browsers: ['Chrome'],

    // Ejecución única (false para que se quede esperando cambios)
    singleRun: false,

    // Concurrencia
    concurrency: Infinity,
    
    // Configuración del plugin de Vite
    vite: {
      config: {
        // Aseguramos que Vite sepa cómo procesar React
        plugins: [require('@vitejs/plugin-react')()]
      }
    }
  })
}