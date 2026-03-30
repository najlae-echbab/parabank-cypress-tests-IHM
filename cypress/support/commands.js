Cypress.Commands.add("waitForParaBankHome", () => {
  cy.contains("Customer Login", { timeout: 20000 }).should("be.visible");
});

Cypress.Commands.add("visitParaBank", () => {
  cy.visit("https://parabank.parasoft.com/parabank/index.htm");
  cy.waitForParaBankHome();
});

Cypress.Commands.add("fillRegisterForm", (user) => {
  cy.get("#customer\\.firstName").clear().type(user.firstName);
  cy.get("#customer\\.lastName").clear().type(user.lastName);
  cy.get("#customer\\.address\\.street").clear().type(user.address);
  cy.get("#customer\\.address\\.city").clear().type(user.city);
  cy.get("#customer\\.address\\.state").clear().type(user.state);
  cy.get("#customer\\.address\\.zipCode").clear().type(user.zipCode);
  cy.get("#customer\\.phoneNumber").clear().type(user.phone);
  cy.get("#customer\\.ssn").clear().type(user.ssn);
  cy.get("#customer\\.username").clear().type(user.username);
  cy.get("#customer\\.password").clear().type(user.password);
  cy.get("#repeatedPassword").clear().type(user.password);
});

Cypress.Commands.add("submitRegisterForm", () => {
  cy.get('input[value="Register"]').click();
});

Cypress.Commands.add("loginParaBank", (user) => {
  cy.get('input[name="username"]').clear().type(user.username);
  cy.get('input[name="password"]').clear().type(user.password);
  cy.get('input[value="Log In"]').click();
});

Cypress.Commands.add("goToMenu", (menuText) => {
  cy.contains("a", menuText).click();
});

Cypress.Commands.add("fillBillPayForm", () => {
  cy.get('input[name="payee.name"]').clear().type("Water Company");
  cy.get('input[name="payee.address.street"]').clear().type("Street 1");
  cy.get('input[name="payee.address.city"]').clear().type("Oujda");
  cy.get('input[name="payee.address.state"]').clear().type("Oriental");
  cy.get('input[name="payee.address.zipCode"]').clear().type("60000");
  cy.get('input[name="payee.phoneNumber"]').clear().type("0611111111");
  cy.get('input[name="payee.accountNumber"]').clear().type("123456");
  cy.get('input[name="verifyAccount"]').clear().type("123456");
  cy.get('input[name="amount"]').clear().type("50");
  cy.get('select[name="fromAccountId"]').find("option").its("length").should("be.gt", 0);
});

Cypress.Commands.add("submitBillPay", () => {
  cy.get('input[value="Send Payment"]').click();
});

Cypress.Commands.add("fillCustomerCareForm", (name) => {
  cy.get("#name").clear().type(name);
  cy.get("#email").clear().type("test@mail.com");
  cy.get("#phone").clear().type("0612345678");
  cy.get("#message").clear().type("Bonjour, ceci est un test.");
});

Cypress.Commands.add("submitCustomerCare", () => {
  cy.get('input[value="Send to Customer Care"]').click();
});