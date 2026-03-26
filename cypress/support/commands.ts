// cypress/support/commands.ts
// Custom commands for common actions
export {};

Cypress.Commands.add('navigateTo', (path: string) => {
  cy.visit(path);
});
