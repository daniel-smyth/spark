import { NFTGenerator } from '@lib/web3';

const mock = new NFTGenerator();

describe('Create Collection', () => {
  it('uploads artwork', () => {
    cy.visit('http://localhost:3000/create');

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
  });

  it('enters collection properties', () => {
    cy.visit('http://localhost:3000/create');

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
    const size = '100';
    const address = '0x69C16A68315f06e9c3120F5739FBCdE647055d15';
    Object.keys(mock.properties).forEach((property) => {
      if (property === 'size') {
        return cy.get(`input[name=${property}]`).type(size);
      }
      if (property === 'symbol') {
        return cy.get(`input[name=${property}]`).type('ABC');
      }
      if (property === 'primary_sale_recipient') {
        return cy.get(`input[name=${property}]`).type(address);
      }
      return cy.get(`input[name=${property}]`).type(property + ' sample');
    });

    cy.get('button').contains(`Submit`).click();
  });
});

export {};
