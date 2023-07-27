/// <reference types="cypress" />

describe('drag корректная работа перетаскивания ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000');
  });

  it('Перетаскивание ингредиентов', () => {
    // Перетаскивание булки.
    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .trigger('dragstart');

    cy.get('[data-cy=constructor]').trigger('drop');

    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('exist');

    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist');

    cy.get('[data-cy=ingredients]')
      .contains('Плоды Фалленианского дерева')
      .trigger('dragstart');

    // Перетаскивание ингредиентов.
    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=constructor]')
      .contains('Плоды Фалленианского дерева')
      .should('exist');
  });

  it('Сортировка ингредиентов', () => {
    // Перетаскивание булки.
    cy.get('[data-cy=ingredients]')
      .contains('Краторная булка N-200i')
      .trigger('dragstart');

    cy.get('[data-cy=constructor]').trigger('drop');

    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка N-200i')
      .should('exist');

    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка N-200i')
      .should('exist');

    // Перетаскивание ингредиентов.
    // Ингредиент 1.
    cy.get('[data-cy=ingredients]')
      .contains('Плоды Фалленианского дерева')
      .trigger('dragstart');

    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=constructor]')
      .contains('Плоды Фалленианского дерева')
      .should('exist');

    // Ингредиент 2.
    cy.get('[data-cy=ingredients]')
      .contains('Хрустящие минеральные кольца')
      .trigger('dragstart');

    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=constructor]')
      .contains('Хрустящие минеральные кольца')
      .should('exist');

    // Сортировка ингредиентов.
    cy.get('[data-cy=card-constructor]')
      .find('.card')
      .contains('Плоды Фалленианского дерева')
      // .first()
      .trigger('dragstart', { DataTransfer });

    cy.get('[data-cy=card-constructor]')
      .find('.card')
      .contains('Хрустящие минеральные кольца')
      .trigger('drop', { DataTransfer });
    // cy.get('[data-cy=constructor]').trigger('drop', { DataTransfer });
  });
});

describe('модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000');
  });

  it('открытие модального окна ингредиента', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#react-modals').contains('Краторная булка N-200i');
  });

  it('закрытие модального окна ингредиента по кнопке', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#react-modals div[aria-label="закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрытие модального окна при click на overlay', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#id-modal').click('left', { force: true });
  });
});
