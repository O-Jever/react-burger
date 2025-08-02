describe('template spec', () => {
  beforeEach(() => {
    cy.setCookie('access', 'access');
    cy.setCookie('refresh', 'refresh');
    cy.intercept(
      {
        method: 'GET',
        url: 'https://norma.nomoreparties.space/api/ingredients'
      },
      {
        success: true,
        data: [
          {
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
          },
          {
            "_id": "643d69a5c3f7b9001cfa0942",
            "name": "Соус Spicy-X",
            "type": "sauce",
            "proteins": 30,
            "fat": 20,
            "carbohydrates": 40,
            "calories": 30,
            "price": 90,
            "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            "__v": 0
          },
          {
            "_id": "643d69a5c3f7b9001cfa0941",
            "name": "Биокотлета из марсианской Магнолии",
            "type": "main",
            "proteins": 420,
            "fat": 142,
            "carbohydrates": 242,
            "calories": 4242,
            "price": 424,
            "image": "https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
            "__v": 0
          }
        ]
      }
    ).as('getIngredients');
    cy.visit('http://localhost:3000');
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it('ingredient modal', () => {
    cy.get('.ingredient:first').should('include.text', 'Краторная булка N-200i').click();
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');
    cy.get('.modal').should('be.visible');
    cy.get('.modal > .modal-header').should('include.text', 'Детали ингредиента');
    cy.get('.ingredient-detail > img').should('have.attr', 'src').and('equals', 'https://code.s3.yandex.net/react/code/bun-02-large.png');
    cy.get('.ingredient-detail > span:first').should('have.text', 'Краторная булка N-200i');
    cy.get('.nutrition-value').eq(0).should('include.text', '420');
    cy.get('.nutrition-value').eq(1).should('include.text', '80');
    cy.get('.nutrition-value').eq(2).should('include.text', '24');
    cy.get('.nutrition-value').eq(3).should('include.text', '53');
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.exist');
  });

  it('drag bun', () => {
    cy.get('.ingredient:first').should('include.text', 'Краторная булка N-200i').trigger('dragstart');
    cy.get('.constructor-element:first').should('have.text', 'Выберите булки').trigger('drop');
    cy.get('.constructor-element:first').should('include.text', 'Краторная булка N-200i (верх)');
    cy.get('.constructor-element:last').should('include.text', 'Краторная булка N-200i (низ)');
  });

  it('drag filling', () => {
    cy.get('.ingredient').eq(1).should('include.text', 'Соус Spicy-X').trigger('dragstart');
    cy.get('.constructor-element').eq(1).should('have.text', 'Выберите начинку').trigger('drop');
    cy.get('.constructor-element').eq(1).should('include.text', 'Соус Spicy-X');

    cy.get('.ingredient').eq(2).should('include.text', 'Биокотлета из марсианской Магнолии').trigger('dragstart');
    cy.get('.constructor-element').eq(1).trigger('drop');
    cy.get('.constructor-element').eq(2).should('include.text', 'Биокотлета из марсианской Магнолии');
  });

  it('create order', () => {
    cy.get('.summary-wrapper').find('button').should('be.disabled');
    cy.get('.ingredient:first').should('include.text', 'Краторная булка N-200i').trigger('dragstart');
    cy.get('.constructor-element:first').should('have.text', 'Выберите булки').trigger('drop');
    cy.get('.constructor-element:first').should('include.text', 'Краторная булка N-200i (верх)');
    cy.get('.constructor-element:last').should('include.text', 'Краторная булка N-200i (низ)');
    cy.get('.ingredient').eq(1).should('include.text', 'Соус Spicy-X').trigger('dragstart');
    cy.get('.constructor-element').eq(1).should('have.text', 'Выберите начинку').trigger('drop');
    cy.get('.constructor-element').eq(1).should('include.text', 'Соус Spicy-X');
    cy.get('.summary-wrapper').find('button').should('be.not.disabled');
    cy.intercept(
      {
        method: 'POST',
        url: 'https://norma.nomoreparties.space/api/orders'
      },
      {
        success: true,
        name: 'name',
        order: {
          number: 100500
        }
      }
    ).as('createOrder');
    cy.get('.summary-wrapper').find('button').click();
    cy.get('.modal').should('be.visible');
    cy.get('.order-detail > span:first').should('have.text', '100500');
    cy.get('.modal-close').click();
    cy.get('.modal').should('not.exist');
    cy.get('.constructor-element').eq(0).should('have.text', 'Выберите булки');
    cy.get('.constructor-element').eq(1).should('have.text', 'Выберите начинку');
    cy.get('.constructor-element').eq(2).should('have.text', 'Выберите булки');
    cy.get('.summary-wrapper').find('button').should('be.disabled');
  });
});