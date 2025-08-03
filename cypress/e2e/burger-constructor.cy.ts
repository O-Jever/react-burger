import * as constants from '../support/constants';

describe('template spec', () => {
  beforeEach(() => {
    cy.setAuthTokens();
    cy.fixture('ingredients-response').then((json) =>
      cy.intercept('GET', `${constants.API_URL}/ingredients`, json).as('getIngredients')
    );
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
  });

  it('ingredient modal', () => {
    cy.get(constants.Selectors.INGREDIENT).eq(0).should('include.text', constants.BUN_NAME).click();

    cy.url().should('include', constants.BUN_PATH);
    cy.get(constants.Selectors.MODAL).should('be.visible');
    cy.get('[data-cy="modal-title"]').should('include.text', constants.MODAL_TITLE);
    cy.get('[data-cy="ingredient-detail-image"]').should('have.attr', 'src').and('equals', 'https://code.s3.yandex.net/react/code/bun-02-large.png');
    cy.get('[data-cy="ingredient-detail-name"]').should('have.text', constants.BUN_NAME);
    cy.get(constants.Selectors.NUTRITION_VALUE).eq(0).should('include.text', '420');
    cy.get(constants.Selectors.NUTRITION_VALUE).eq(1).should('include.text', '80');
    cy.get(constants.Selectors.NUTRITION_VALUE).eq(2).should('include.text', '24');
    cy.get(constants.Selectors.NUTRITION_VALUE).eq(3).should('include.text', '53');

    cy.checkModalClose();
  });

  it('drag bun', () => {
    cy.dragIngredientNToConstructorElementN(0, 0);
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(0).should('include.text', constants.TOP_BUN_NAME);
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(-1).should('include.text', constants.BOTTOM_BUN_NAME);
  });

  it('drag filling', () => {
    cy.dragIngredientNToConstructorElementN(1, 1);
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(1).should('include.text', constants.SAUCE_NAME);

    cy.dragIngredientNToConstructorElementN(2, 1);
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(2).should('include.text', constants.MAIN_NAME);
  });

  it('create order', () => {
    cy.get(constants.Selectors.SUMMARY_WRAPPER).find('button').should('be.disabled');

    cy.dragIngredientNToConstructorElementN(0, 0);
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(0).should('include.text', constants.TOP_BUN_NAME);
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(-1).should('include.text', constants.BOTTOM_BUN_NAME);

    cy.dragIngredientNToConstructorElementN(1, 1);
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(1).should('include.text', constants.SAUCE_NAME);

    cy.get(constants.Selectors.SUMMARY_WRAPPER).find('button').should('be.not.disabled');

    cy.fixture('create-order-response').then((json) =>
      cy.intercept('POST', `${constants.API_URL}/orders`, json).as('createOrder')
    );

    cy.get(constants.Selectors.SUMMARY_WRAPPER).find('button').click();
    cy.get(constants.Selectors.MODAL).should('be.visible');
    cy.get('[data-cy="order-detail-number"]').should('have.text', constants.ORDER_NUMBER);

    cy.checkModalClose();
    cy.checkConsructorIsEmpty();
  });
});