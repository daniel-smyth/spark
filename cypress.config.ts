import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-metamask-v2/cypress/plugins')(on);
    }
  }
});
