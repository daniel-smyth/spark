import { defineConfig } from 'cypress';

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-metamask-v2/cypress/plugins')(on);
      // // bind to the event we care about
      // on('task', (arg1, arg2) => {
      //   // plugin stuff here
      //   require('cypress-metamask-v2/cypress/plugins')(on);
      // });
    }
  }
});
