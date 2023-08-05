/// <reference types="cypress" />

describe('login', () => {
  before(function () {
    cy.visit('http://localhost:3000/login');
  });

  it('login', () => {
    cy.get('input').type('email');
  });
});
