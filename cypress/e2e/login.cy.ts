// cypress/e2e/login.cy.ts
describe('Login Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('devrait afficher la page de connexion', () => {
    cy.get('ion-card-title').should('contain', 'Login');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('devrait afficher les erreurs pour des champs vides', () => {
    cy.get('button[type="submit"]').click();
    cy.get('ion-text.ion-invalid').should('have.length', 2);
  });

  it('devrait permettre à un utilisateur de se connecter', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/tabs');
  });

  it('devrait afficher un message d\'erreur avec identifiants invalides', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('ion-toast').should('contain', 'Invalid credentials');
  });

  it('devrait naviguer vers forgot-password', () => {
    cy.get('a[href="/forgot-password"]').click();
    cy.url().should('include', '/forgot-password');
  });
});
