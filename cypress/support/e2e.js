import './commands'
import "cypress-mochawesome-reporter/register";
beforeEach(() => {
  cy.viewport(1536, 960);
});
Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("postMessage")) {
    return false;
  }
});