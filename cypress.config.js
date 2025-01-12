const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 5000,
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/commands.js",
  },
});
