/// <reference types="cypress" />

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

    const dataTransfer = new DataTransfer();

    // cy.get('.card1').trigger('dragstart', {
    //   dataTransfer,
    // });

    // cy.get('.card0').trigger('drop', {
    //   dataTransfer,
    //   force: true,
    // });

    cy.get('.card0').trigger('dragstart', { force: true });

    cy.get('.card1').trigger('drop', { force: true, clientY: 200 });

    // cy.get('.card1').trigger('drop', {
    //   dataTransfer,
    //   force: true,
    //   clientX: 0,
    //   clientY: 138,
    // });

    // const dataTransfer = new DataTransfer();

    // // cy.get('[data-cy=card-constructor]')
    // cy.get('.card0')
    //   // .find('.card')
    //   // .contains('Плоды Фалленианского дерева')
    //   // .first()
    //   .trigger('dragstart', { dataTransfer, force: true });

    // // .trigger('dragstart', { dataTransfer });

    // cy.get('.card1')
    //   // .find('.card')
    //   // .contains('Хрустящие минеральные кольца')
    //   .trigger('drop', { dataTransfer, force: true });
    // // .trigger('drop', { dataTransfer });
    // // cy.get('[data-cy=constructor]').trigger('drop', { DataTransfer });

    // // cy.get('*').find('div').contains("традиционный").first().trigger('dragstart', { DataTransfer });
    // //   cy.get('#constructor').trigger('drop', { DataTransfer });
  });
});

describe('работа с модальным окном заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:3000');
  });

  it('открытие модального окна заказа', () => {
    // Логин пользователя.
    cy.visit('http://localhost:3000/login');

    cy.get('#id-email')
      .parent()
      .within(() => {
        cy.get('input').type('mmt_1974@mail.ru');
      });

    cy.get('#id-password')
      .parent()
      .within(() => {
        cy.get('input').type('new_password');
      });

    cy.get('button').contains('Войти').click();

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

    // Открытие модального окна заказа.
    cy.contains('идентификатор заказа').should('not.exist');
    cy.contains('Оформить заказ').click();
    cy.contains('идентификатор заказа').should('exist');
    cy.get('#react-modals').contains(
      'Дождитесь готовности на орбитальной станции'
    );

    // закрытие модального окна заказа по кнопке.
    cy.get('#react-modals div[aria-label="закрыть"]').click();
    cy.contains('идентификатор заказа').should('not.exist');

    // Открытие модального окна заказа.
    cy.contains('идентификатор заказа').should('not.exist');
    cy.contains('Оформить заказ').click();
    cy.contains('идентификатор заказа').should('exist');
    cy.get('#react-modals').contains(
      'Дождитесь готовности на орбитальной станции'
    );

    // закрытие модального окна заказа при click на overlay.
    cy.get('#id-modal').click('left', { force: true });
    cy.contains('идентификатор заказа').should('not.exist');
  });
});
