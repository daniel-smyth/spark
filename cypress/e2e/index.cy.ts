describe('Create Collection', () => {
  it('navigates to create collection page', () => {
    cy.visit('http://localhost:3000/');

    cy.get(`[id="hero-submit"]`).click();
  });
});

// describe('Create Collection', () => {
//   const user = UserDatabase.get();
//   const integrations = IntegrationDatabase.getAll();

//   // Get integration with mappings for full coverage
//   const integration = integrations.find((i) => i.field_mappings);
//   const integrationOptions = Object.keys(integration.options);
//   const integrationFieldMaps = Object.keys(user.contacts[0]);

//   it('displays all integrations and their options', () => {
//     cy.visit('http://localhost:3000/');

//     integrations.forEach((integration) => {
//       // Integration option inputs
//       Object.keys(integration.options).forEach((o) => {
//         cy.get(`[id="${integration.name}-${o}"]`).should('have.value', '');
//       });

//       // Integration field mappings inputs
//       if (integration.field_mappings) {
//         Object.keys(integration.field_mappings).forEach((map) => {
//           cy.get(`[id="${integration.name}-${map}"]`).should('have.value', '');
//         });
//       }
//     });
//   });

//   it('connects an integration and disable inputs', () => {
//     // Populate integration options
//     integrationOptions.forEach((o) => {
//       cy.get(`[id="${integration.name}-${o}"]`).type(`${o}-testinput`);
//     });

//     // Populate integration field mappings
//     integrationFieldMaps.forEach((map) => {
//       cy.get(`[id="${integration.name}-${map}"]`).type(`${map}-testinput`);
//     });

//     // Connect integration
//     cy.get('button').contains(`Connect ${integration.name}`).click();

//     cy.reload();

//     // Inputs are disabled
//     integrationOptions.forEach((o) => {
//       cy.get(`[id="${integration.name}-${o}"]`).should('be.disabled');
//     });
//     integrationFieldMaps.forEach((map) => {
//       cy.get(`[id="${integration.name}-${map}"]`).should('be.disabled');
//     });
//   });

//   it('disconnects an integration option', () => {
//     // Disconnect integration
//     cy.get('button').contains(`Disconnect ${integration.name}`).click();

//     // Button now gives option to connect
//     cy.get('button').contains(`Connect ${integration.name}`);

//     // Integration option inputs are enabled
//     integrationOptions.forEach((o) => {
//       cy.get(`[id="${integration.name}-${o}"]`).should('not.be.disabled');
//     });

//     // Integration field mappings inputs are enabled
//     integrationFieldMaps.forEach((map) => {
//       cy.get(`[id="${integration.name}-${map}"]`).should('not.be.disabled');
//     });
//   });

//   it('creates a new integration', () => {
//     const integrationName = 'MyNewIntegration';

//     // Give integration a name
//     cy.get(`[id="new-integration-name"]`).type(integrationName);

//     // Add fields to new integration
//     cy.get(`[id="integration-options-0"]`).type('random_field');
//     cy.get(`button`).contains('Add Field').click();
//     cy.get(`[id="integration-options-1"]`).type('random_field');

//     // Add mappings
//     cy.get(`[id="new-integration-mappings"]`).click();

//     // Create integration
//     cy.get('button').contains(`Create Integration`).click();
//     cy.get('[id=integration-create-result]').contains(
//       `New integration created`
//     );

//     cy.reload();

//     cy.contains(integrationName);
//   });
// });

export {};
