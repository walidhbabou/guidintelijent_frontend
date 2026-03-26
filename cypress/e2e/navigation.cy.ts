// cypress/e2e/navigation.cy.ts
describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/tabs/tab1');
  });

  it('devrait naviguer entre les tabs', () => {
    cy.get('ion-tab-button[tab="tab1"]').should('have.class', 'tab-selected');
    cy.get('ion-tab-button[tab="tab2"]').click();
    cy.get('ion-tab-button[tab="tab2"]').should('have.class', 'tab-selected');
  });

  it('devrait afficher le bon contenu par tab', () => {
    cy.get('ion-tab-button[tab="tab1"]').click();
    cy.get('app-tab1').should('be.visible');
  });

  it('devrait conserver l\'état lors de la navigation', () => {
    cy.get('ion-button:contains("Set Value")').click();
    cy.get('ion-input').should('have.value', 'somevalue');
    cy.get('ion-tab-button[tab="tab2"]').click();
    cy.get('ion-tab-button[tab="tab1"]').click();
    cy.get('ion-input').should('have.value', 'somevalue');
  });
});
