import * as constants from '../support/constants';

Cypress.Commands.add('setAuthTokens', () => {
    cy.setCookie('access', 'access');
    cy.setCookie('refresh', 'refresh');
    cy.setCookie('date', new Date().toISOString());
});

Cypress.Commands.add('checkConsructorIsEmpty', () => {
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(0).should('have.text', constants.EMPTY_BUN);
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(1).should('have.text', constants.EMPTY_FILLING);
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(2).should('have.text', constants.EMPTY_BUN);
    cy.get(constants.Selectors.SUMMARY_WRAPPER).find('button').should('be.disabled');
});

Cypress.Commands.add('checkModalClose', () => {
    cy.get(constants.Selectors.MODAL_CLOSE).click();
    cy.get(constants.Selectors.MODAL).should('not.exist');
});

Cypress.Commands.add('dragIngredientNToConstructorElementN', (ingredientIndex: number, constructorElementIndex: number) => {
    cy.get(constants.Selectors.INGREDIENT).eq(ingredientIndex).trigger('dragstart');
    cy.get(constants.Selectors.CONSTRUCTOR_ELEMENT).eq(constructorElementIndex).trigger('drop');
});

declare global {
  namespace Cypress {
    interface Chainable {
      setAuthTokens(): Chainable;
      checkConsructorIsEmpty(): Chainable;
      checkModalClose(): Chainable;
      dragIngredientNToConstructorElementN(ingredientIndex: number, constructorElementIndex: number): Chainable;
    }
  }
}