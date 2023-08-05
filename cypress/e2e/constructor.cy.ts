/// <reference types="cypress" />

const testUrl: string = 'http://localhost:3000';
const bunName: string = 'Краторная булка N-200i';
const ingredientsDetails: string = 'Детали ингредиента';
const ingredient1: string = 'Плоды Фалленианского дерева';
const ingredient2: string = 'Хрустящие минеральные кольца';

const idOrder: string = 'идентификатор заказа';
const getOrder: string = 'Оформить заказ';

const modalLabel: string = 'Дождитесь готовности на орбитальной станции';

describe('модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('открытие модального окна ингредиента', () => {
    cy.contains(ingredientsDetails).should('not.exist');
    cy.contains(bunName).click();
    cy.contains(ingredientsDetails).should('exist');
    cy.get('#react-modals').contains(bunName);
  });

  it('закрытие модального окна ингредиента по кнопке', () => {
    cy.contains(ingredientsDetails).should('not.exist');
    cy.contains(bunName).click();
    cy.contains(ingredientsDetails).should('exist');
    cy.get('#react-modals div[aria-label="закрыть"]').click();
    cy.contains(ingredientsDetails).should('not.exist');
  });

  it('закрытие модального окна при click на overlay', () => {
    cy.contains(ingredientsDetails).should('not.exist');
    cy.contains(bunName).click();
    cy.contains(ingredientsDetails).should('exist');
    cy.get('#id-modal').click('left', { force: true });
  });
});

describe('drag корректная работа перетаскивания ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('Перетаскивание ингредиентов', () => {
    // Перетаскивание булки.
    cy.get('[data-cy=ingredients]').contains(bunName).trigger('dragstart');

    cy.get('[data-cy=constructor]').trigger('drop');

    cy.get('[data-cy=constructor-bun-1]').contains(bunName).should('exist');

    cy.get('[data-cy=constructor-bun-2]').contains(bunName).should('exist');

    cy.get('[data-cy=ingredients]').contains(ingredient1).trigger('dragstart');

    // Перетаскивание ингредиентов.
    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=constructor]').contains(ingredient1).should('exist');
  });

  it('Сортировка ингредиентов', () => {
    // Перетаскивание булки.
    cy.get('[data-cy=ingredients]').contains(bunName).trigger('dragstart');

    cy.get('[data-cy=constructor]').trigger('drop');

    cy.get('[data-cy=constructor-bun-1]').contains(bunName).should('exist');

    cy.get('[data-cy=constructor-bun-2]').contains(bunName).should('exist');

    // Перетаскивание ингредиентов.
    // Ингредиент 1.
    cy.get('[data-cy=ingredients]').contains(ingredient1).trigger('dragstart');

    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=constructor]').contains(ingredient1).should('exist');

    // Ингредиент 2.
    cy.get('[data-cy=ingredients]').contains(ingredient2).trigger('dragstart');

    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=constructor]').contains(ingredient2).should('exist');

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
    //   // .contains(ingredient1)
    //   // .first()
    //   .trigger('dragstart', { dataTransfer, force: true });

    // // .trigger('dragstart', { dataTransfer });

    // cy.get('.card1')
    //   // .find('.card')
    //   // .contains(ingredient2)
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
    cy.visit(testUrl);
  });

  it('открытие модального окна заказа', () => {
    // Логин пользователя.
    cy.visit(testUrl + '/login');

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
    cy.get('[data-cy=ingredients]').contains(bunName).trigger('dragstart');

    cy.get('[data-cy=constructor]').trigger('drop');

    cy.get('[data-cy=constructor-bun-1]').contains(bunName).should('exist');

    cy.get('[data-cy=constructor-bun-2]').contains(bunName).should('exist');

    cy.get('[data-cy=ingredients]').contains(ingredient1).trigger('dragstart');

    // Перетаскивание ингредиентов.
    cy.get('[data-cy=constructor]').trigger('drop');
    cy.get('[data-cy=constructor]').contains(ingredient1).should('exist');

    // Открытие модального окна заказа.
    cy.contains(idOrder).should('not.exist');
    cy.contains(getOrder).click();
    cy.contains(idOrder).should('exist');
    cy.get('#react-modals').contains(modalLabel);

    // закрытие модального окна заказа по кнопке.
    cy.get('#react-modals div[aria-label="закрыть"]').click();
    cy.contains(idOrder).should('not.exist');

    // Открытие модального окна заказа.
    cy.contains(idOrder).should('not.exist');
    cy.contains(getOrder).click();
    cy.contains(idOrder).should('exist');
    cy.get('#react-modals').contains(modalLabel);

    // закрытие модального окна заказа при click на overlay.
    cy.get('#id-modal').click('left', { force: true });
    cy.contains(idOrder).should('not.exist');
  });
});
