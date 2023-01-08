import { NFTGenerator } from '@lib/web3/nftgenerator';

const mock = new NFTGenerator();

describe('Create Collection', () => {
  // it('uploads artwork', () => {
  //   cy.visit('http://localhost:3000/create');

  //   // Upload sample artwork
  //   cy.fixture('artwork').then((artwork) => {
  //     cy.get('input[type=file]').selectFile(
  //       artwork.map((img: string) => `cypress/fixtures/artwork/${img}`),
  //       { force: true }
  //     );
  //   });

  //   // Displays sample artwork's traits
  //   cy.fixture('traits').then((traits) => {
  //     traits.forEach((trait: string) => {
  //       cy.contains(trait);
  //     });
  //   });
  // });

  it('enters collection properties', () => {
    cy.visit('http://localhost:3000/create');

    // Upload sample artwork
    cy.fixture('artwork').then((artwork) => {
      cy.get('input[type=file]').selectFile(
        artwork.map((img: string) => `cypress/fixtures/artwork/${img}`),
        { force: true }
      );
    });

    // Displays sample artwork's traits
    cy.fixture('traits').then((traits) => {
      traits.forEach((trait: string) => {
        cy.contains(trait);
      });
    });

    cy.get('button').contains(`Submit`).click();

    Object.keys(mock.properties).forEach((property) => {
      if (property === 'size') {
        cy.get(`input[name=${property}]`).type('100');
      } else if (property === 'primary_sale_recipient') {
        cy.get(`input[name=${property}]`).type(
          '0x69C16A68315f06e9c3120F5739FBCdE647055d15'
        );
      } else {
        cy.get(`input[name=${property}]`).type(property + ' sample');
      }
    });

    cy.get('button').contains(`Submit`).click();
  });
});

export {};
