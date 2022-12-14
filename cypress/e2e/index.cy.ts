import { NFTGenerator } from '@lib/web3/nftgenerator';

const mock = new NFTGenerator();

// describe('Connect Wallet', () => {
//   it('connects via MetaMask', () => {
//     cy.visit('http://localhost:3000');

//     cy.get('button').contains(`Connect Wallet`).click();

//     cy.get('div').contains(`MetaMask`).click();

//     cy.get('div').contains(`Sign in`).click();
//   });
// });

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

    // Connect MetaMask
    cy.get('button').contains(`Connect Wallet`).click();
    cy.get('div').contains(`MetaMask`).click();
    cy.get('div').contains(`Sign in`).click();

    // Wait 10 seconds to click "Sign"
    cy.wait(10000);

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

    // Enter sample data into inputs
    Object.keys(mock.properties).forEach((property) => {
      switch (property) {
        case 'size':
          cy.get(`input[name=${property}]`).type('100');
          break;
        case 'primary_sale_recipient':
          cy.get(`input[name=${property}]`).type(
            '0x69C16A68315f06e9c3120F5739FBCdE647055d15'
          );
          break;
        default:
          cy.get(`input[name=${property}]`).type(property + ' sample');
          break;
      }
    });

    cy.get('button').contains(`Submit`).click();
  });
});

export {};
