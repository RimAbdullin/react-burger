/// <reference types="cypress" />

describe('drag корректная работа перетаскивания ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000');
  });

  it('Перетаскивание булки', () => {
    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .trigger('dragstart');

    // cy.wait(3000);
    cy.get('[data-cy=constructor]').trigger('drop');
    // cy.get('[data-cy=constructor-bun-1]')
    //   .contains('Краторная булка N-200i')
    //   .should('exist');

    // cy.get('[data-cy=constructor-bun-2]')
    //   .contains('Краторная булка N-200i')
    //   .should('exist');
  });
});
