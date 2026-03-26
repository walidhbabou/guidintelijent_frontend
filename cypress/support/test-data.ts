// cypress/support/test-data.ts
// Données de test réutilisables pour Cypress

export const testUsers = {
  validUser: {
    email: 'user@example.com',
    password: 'Test@1234',
  },
  invalidCredentials: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },
  testUserForFavoris: {
    email: 'favorites@example.com',
    password: 'Test@1234',
  },
};

export const testConstants = {
  baseUrl: 'http://localhost:4200',
  timeout: 10000,
  shortTimeout: 5000,
};

/**
 * Attendre qu'une page soit chargée
 */
export function waitForPageLoad(pageTitle: string): void {
  cy.get(`ion-title:contains("${pageTitle}")`).should('be.visible');
}

/**
 * Vérifier qu'on est sur une page spécifique
 */
export function verifyPageUrl(path: string): void {
  cy.url().should('include', path);
}

/**
 * Attendre un toast
 */
export function waitForToast(message: string): void {
  cy.get('ion-toast').should('be.visible').should('contain', message);
}
