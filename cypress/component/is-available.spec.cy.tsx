/// <reference types="cypress" />

describe('service is available', function () {
  // before(function () {

  // });

  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');

    cy.get('*').contains('Соберите бургер');
  });
});
