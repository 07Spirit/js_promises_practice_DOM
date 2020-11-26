'use strict';

Cypress.Commands.add('clickButton',
  (mouseButton) => {
    cy.get('body').trigger('mousedown', mouseButton)
      .trigger('mouseup');
  });

Cypress.Commands.add('checkPromiseExists',
  (promise) => {
    cy.get('[data-qa="notification"]').contains(promise);
  });

const firstResolvedMsg = 'First promise was resolved';
const firstRejectedMsg = 'First promise was rejected';
const secondResolvedMsg = 'Second promise was resolved';
const thirdResolvedMsg = 'Third promise was resolved';

describe('Promises in DOM', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should resolve first promise left click', function() {
    cy.clickButton({ button: 0 });
    cy.checkPromiseExists(firstResolvedMsg);
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.checkPromiseExists(firstRejectedMsg).should('not.exist');
  });

  it('should resolve first promise right click', function() {
    cy.clickButton({ button: 2 });
    cy.checkPromiseExists(firstResolvedMsg);
  });

  it('should resolve first promise middle button click', function() {
    cy.clickButton({ button: 1 });
    cy.checkPromiseExists(firstResolvedMsg);
  });

  it('should ignore middle button click for the second promise', function() {
    cy.clickButton({ button: 1 });
    cy.clickButton({ button: 1 });
    cy.checkPromiseExists(secondResolvedMsg).should('not.exist');
  });

  it('should reject first promise after 3 seconds of inactivity', function() {
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.checkPromiseExists(firstRejectedMsg);
  });

  it('should resolve second promise on right click', function() {
    cy.clickButton({ button: 2 });
    cy.checkPromiseExists(secondResolvedMsg);
  });

  it('should resolve second promise on left click', function() {
    cy.clickButton({ button: 0 });
    cy.checkPromiseExists(secondResolvedMsg);
  });

  it('should resolve third promise', function() {
    cy.clickButton({ button: 2 });
    cy.clickButton({ button: 0 });
    cy.checkPromiseExists(thirdResolvedMsg);
  });

  it('should resolve all promises', function() {
    cy.clickButton({ button: 2 });
    cy.clickButton({ button: 0 });
    cy.checkPromiseExists(firstResolvedMsg);
    cy.checkPromiseExists(secondResolvedMsg);
    cy.checkPromiseExists(thirdResolvedMsg);
  });

  it('should reject 1st promise, resolve 2nd and 3rd promises', function() {
    // NOTE: waiting for reject
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.clickButton({ button: 0 });
    cy.clickButton({ button: 2 });
    cy.checkPromiseExists(firstRejectedMsg);
    cy.checkPromiseExists(secondResolvedMsg);
    cy.checkPromiseExists(thirdResolvedMsg);
  });
});
