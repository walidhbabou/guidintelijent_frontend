# Guide des Tests Angular et Cypress

## Installation et Configuration

### Tests Unitaires Angular (Jasmine + Karma)
Les tests unitaires sont déjà configurés. Ils testent les services, composants et pipes isolément.

### Tests E2E Cypress
Cypress a été installé pour les tests end-to-end qui simulent les interactions utilisateur.

---

## Lancer les Tests

### Tests Unitaires
```bash
# Exécuter les tests en mode watch
npm run test

# Exécuter les tests une seule fois avec couverture
npm run test:headless
```

### Tests E2E avec Cypress
```bash
# Ouvrir l'interface Cypress (interactive mode)
npm run e2e

# Exécuter tous les tests E2E en headless (CLI)
npm run e2e:headless

# Exécuter en mode CI
npm run e2e:ci
```

---

## Structure des Tests

### Tests Unitaires
```
src/
  app/
    login/
      login.page.spec.ts           ← Test du composant
    core/
      services/
        auth.service.spec.ts       ← Test du service
```

**Fichier d'exemple:** `src/app/login/login.page.spec.example.ts`

**Éléments clés:**
- `TestBed.configureTestingModule()` : Configure les dépendances
- `jasmine.createSpyObj()` : Mock les services
- `fixture.detectChanges()` : Détecte les changements
- `expect()` : Assertions

### Tests E2E
```
cypress/
  e2e/
    login.cy.ts               ← Tests de la page login
    navigation.cy.ts          ← Tests de navigation
  support/
    e2e.ts                   ← Commandes globales
    commands.ts              ← Commandes personnalisées
  cypress.config.ts          ← Configuration Cypress
```

---

## Exemples de Tests

### Test Unitaire - Composant
```typescript
describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  it('devrait valider le formulaire', () => {
    component.loginForm.patchValue({
      email: 'user@example.com',
      password: 'password123',
    });
    expect(component.loginForm.valid).toBeTruthy();
  });
});
```

### Test Unitaire - Service
```typescript
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('devrait faire un appel API de login', () => {
    service.login('user@example.com', 'password123').subscribe();
    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'test-token' });
  });
});
```

### Test E2E - Cypress
```typescript
describe('Login Page E2E', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('devrait se connecter avec des identifiants valides', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/tabs');
  });
});
```

---

## Meilleures Pratiques

### Tests Unitaires
1. **Un test = Un comportement**
   ```typescript
   it('devrait afficher une erreur si email invalide', () => { ... });
   ```

2. **Arrange, Act, Assert (AAA)**
   ```typescript
   // Arrange
   component.form.patchValue({ email: 'invalid' });
   
   // Act
   component.submit();
   
   // Assert
   expect(component.errors).toContain('Email invalide');
   ```

3. **Mock les dépendances**
   ```typescript
   const serviceSpy = jasmine.createSpyObj('Service', ['method']);
   ```

### Tests E2E
1. **Testez les workflows complets**
   - Login → Navigation → Interaction → Logout

2. **Utilisez les sélecteurs stables**
   - ✅ `cy.get('button[type="submit"]')`
   - ❌ `cy.get('button').eq(0)` (fragile)

3. **Attendez les éléments**
   ```typescript
   cy.get('ion-toast', { timeout: 10000 }).should('be.visible');
   ```

4. **Commandes personnalisées**
   ```typescript
   cy.login('user@example.com', 'password123');
   ```

---

## Couverture des Tests

Pour générer un rapport de couverture:
```bash
npm run test:headless
# Le rapport se trouve dans: coverage/app/index.html
```

Ouvrez le fichier dans un navigateur pour voir la couverture par fichier.

---

## Dépannage

### Tests qui échouent
1. Vérifiez que le serveur Angular est lancé (`npm start`)
2. Vérifiez les sélecteurs CSS dans Cypress
3. Augmentez les timeouts si réseau lent: `{ timeout: 15000 }`

### Cypress ne trouve pas les éléments
1. Inspectez l'application: `cy.debug()`
2. Prenez une screenshot: `cy.screenshot()`
3. Vérifiez que l'élément est visible: `cy.get('element').should('be.visible')`

---

## Ressources Utiles

- [Jasmine Docs](https://jasmine.github.io/)
- [Karma Docs](https://karma-runner.github.io/)
- [Cypress Docs](https://docs.cypress.io/)
- [Angular Testing Guide](https://angular.io/guide/testing)
