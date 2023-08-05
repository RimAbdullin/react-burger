/// <reference types="cypress" />

describe('service is available', function () {
  it('Тестирование страницы "Конструктор" по адресу "localhost:3000"', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
    cy.contains('Булки');
    cy.contains('Соусы');
    cy.contains('Начинка');
  });
});
