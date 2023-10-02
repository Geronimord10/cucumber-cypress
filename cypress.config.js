const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  env: {
    TAGS: "not @ignore",
    //config url
    YVYTU_URL: "https://vientosdelaselva.com.ar/#reserva/",
    EDEN_URL: "https://www.edenentradas.com.ar/",
    CLARO_URL: "https://tienda.claro.com.ar/",
    DEXTER_URL: "https://www.dexter.com.ar/",
    STORE_URL: "https://automationteststore.com/",
    // config usuarios
    users: [
      {
        user: "geroautom",
        pass: "automation"
      },
      {
        user: "geroepaaa",
        pass: "llalalala"
      }
    ]
  },
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      require("cypress-image-diff-js/plugin")(on, config);
      return config;
    },
  },
  viewportWidth: 1536,
  viewportHeight: 960,
  video: false,
  retries: {
    openMode: 2,
    runMode: 1,
  },
  defaultCommandTimeout: 8000,
});
