import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const SEL = {
  auth: {
    registerLink: 'a[href*="register.htm"]',
    forgotLoginLink: 'a[href*="lookup.htm"]',
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    loginButton: 'input[value="Log In"]',
    logoutLink: 'a[href*="logout.htm"]',
  },

  register: {
    firstName: "#customer\\.firstName",
    lastName: "#customer\\.lastName",
    street: "#customer\\.address\\.street",
    city: "#customer\\.address\\.city",
    state: "#customer\\.address\\.state",
    zipCode: "#customer\\.address\\.zipCode",
    phone: "#customer\\.phoneNumber",
    ssn: "#customer\\.ssn",
    username: "#customer\\.username",
    password: "#customer\\.password",
    repeatedPassword: "#repeatedPassword",
    submit: 'input[value="Register"]',
    errorUsername: "#customer\\.username\\.errors",
  },

  overview: {
    table: "#accountTable",
    accountLink: '#accountTable a[href*="activity.htm?id="]',
  },

  activity: {
    table: "#transactionTable",
    transactionLink: '#transactionTable a[href*="transaction.htm?id="]',
  },

  transaction: {
    details: "#rightPanel",
  },

  openAccount: {
    menu: 'a[href*="openaccount.htm"]',
    accountType: "#type",
    fromAccount: "#fromAccountId",
    submit: 'input[value="Open New Account"]',
    result: "#openAccountResult",
  },

  transfer: {
    menu: 'a[href*="transfer.htm"]',
    amount: "#amount",
    fromAccount: "#fromAccountId",
    toAccount: "#toAccountId",
    submit: 'input[value="Transfer"]',
    result: "#showResult",
  },

  billPay: {
    menu: 'a[href*="billpay.htm"]',
    payeeName: 'input[name="payee.name"]',
    address: 'input[name="payee.address.street"]',
    city: 'input[name="payee.address.city"]',
    state: 'input[name="payee.address.state"]',
    zipCode: 'input[name="payee.address.zipCode"]',
    phone: 'input[name="payee.phoneNumber"]',
    account: 'input[name="payee.accountNumber"]',
    verifyAccount: 'input[name="verifyAccount"]',
    amount: 'input[name="amount"]',
    fromAccount: 'select[name="fromAccountId"]',
    submit: 'input[value="Send Payment"]',
    result: "#billpayResult",
  },

  updateProfile: {
    menu: 'a[href*="updateprofile.htm"]',
    firstName: "#customer\\.firstName",
    submit: 'input[value="Update Profile"]',
    result: "#updateProfileResult",
  },

  requestLoan: {
    menu: 'a[href*="requestloan.htm"]',
    amount: "#amount",
    downPayment: "#downPayment",
    fromAccount: "#fromAccountId",
    submit: 'input[value="Apply Now"]',
    result: "#requestLoanResult",
  },

  topNav: {
    about: 'a[href*="about.htm"]',
    services: 'a[href*="services.htm"]',
   products: 'a[href*="products"]',
locations: 'a[href*="solutions"]',
    admin: 'a[href*="admin.htm"]',
    homeIcon: 'a[href="index.htm"]',
    aboutIcon: 'a[href="about.htm"]',
    contactIcon: 'a[href="contact.htm"]',
  },

  customerCare: {
    name: 'input[id="name"]',
    email: 'input[id="email"]',
    phone: 'input[id="phone"]',
    message: 'textarea[id="message"]',
    submit: 'input[value="Send to Customer Care"]',
    result: "#rightPanel",
  },
};

let userData = null;

function buildUser() {
  const unique = `${Date.now().toString().slice(-6)}${Cypress._.random(100, 999)}`;

  return {
    firstName: "najlae",
    lastName: "Test",
    address: "Oujda",
    city: "Oujda",
    state: "Oriental",
    zipCode: "60000",
    phone: "0612345678",
    ssn: `S${unique}`,
    username: `u${unique}`,
    password: "Test1234!",
  };
}

function fillRegisterForm(data) {
  cy.get(SEL.register.firstName).clear().type(data.firstName);
  cy.get(SEL.register.lastName).clear().type(data.lastName);
  cy.get(SEL.register.street).clear().type(data.address);
  cy.get(SEL.register.city).clear().type(data.city);
  cy.get(SEL.register.state).clear().type(data.state);
  cy.get(SEL.register.zipCode).clear().type(data.zipCode);
  cy.get(SEL.register.phone).clear().type(data.phone);
  cy.get(SEL.register.ssn).clear().type(data.ssn);
  cy.get(SEL.register.username).clear().type(data.username);
  cy.get(SEL.register.password).clear().type(data.password);
  cy.get(SEL.register.repeatedPassword).clear().type(data.password);
}

function submitRegisterWithRetry(maxAttempts = 3) {
  function attemptRegister(attempt) {
    cy.log(`Tentative d'inscription: ${attempt}/${maxAttempts}`);
    cy.get(SEL.register.submit).click();
    cy.wait("@register", { timeout: 30000 });

    cy.get("body", { timeout: 15000 }).then(($body) => {
      const bodyText = $body.text();

      const hasDuplicateMessage =
        bodyText.includes("This username already exists.") ||
        bodyText.includes("This username already exists");

      const isSuccess =
        bodyText.includes("Welcome") &&
        bodyText.includes(userData.username);

      if (isSuccess) {
        cy.log(`Inscription réussie avec ${userData.username}`);
        return;
      }

      if (hasDuplicateMessage && attempt < maxAttempts) {
        cy.log("Username déjà existant, régénération des données...");
        userData = buildUser();
        cy.log(`NOUVEAU USERNAME: ${userData.username}`);
        cy.log(`NOUVEAU SSN: ${userData.ssn}`);
        fillRegisterForm(userData);
        attemptRegister(attempt + 1);
        return;
      }

      if (hasDuplicateMessage && attempt >= maxAttempts) {
        throw new Error(
          `Échec register après ${maxAttempts} tentatives : username déjà existant`
        );
      }

      throw new Error(
        "Échec register : inscription non confirmée et message de succès introuvable"
      );
    });
  }

  attemptRegister(1);
}

function loginParaBank(data) {
  cy.get(SEL.auth.username).clear().type(data.username);
  cy.get(SEL.auth.password).clear().type(data.password);
  cy.get(SEL.auth.loginButton).click();
}

function fillBillPayForm() {
  cy.get(SEL.billPay.payeeName).clear().type("Electricite Oujda");
  cy.get(SEL.billPay.address).clear().type("Boulevard Mohammed V");
  cy.get(SEL.billPay.city).clear().type("Oujda");
  cy.get(SEL.billPay.state).clear().type("Oriental");
  cy.get(SEL.billPay.zipCode).clear().type("60000");
  cy.get(SEL.billPay.phone).clear().type("0525363636");
  cy.get(SEL.billPay.account).clear().type("123456789");
  cy.get(SEL.billPay.verifyAccount).clear().type("123456789");
  cy.get(SEL.billPay.amount).clear().type("25");
  cy.get(SEL.billPay.fromAccount).find("option").its("length").should("be.gt", 0);
}

function fillCustomerCareForm(firstName) {
  cy.get(SEL.customerCare.name).clear().type(firstName);
  cy.get(SEL.customerCare.email).clear().type("najlae.test@example.com");
  cy.get(SEL.customerCare.phone).clear().type("0612345678");
  cy.get(SEL.customerCare.message)
    .clear()
    .type("Bonjour, ceci est un message de test automatique Cypress.");
}

Before(() => {
  cy.intercept("POST", "**/register.htm").as("register");
  cy.intercept("POST", "**/login.htm").as("login");
  cy.intercept("GET", "**/overview.htm").as("overview");
  cy.intercept("GET", "**/activity.htm*").as("activity");
  cy.intercept("GET", "**/transaction.htm*").as("transaction");
  cy.intercept("POST", "**/openaccount.htm").as("openAccount");
  cy.intercept("POST", "**/transfer.htm").as("transferFunds");
  cy.intercept("POST", "**/billpay.htm").as("billPay");
  cy.intercept("POST", "**/updateprofile.htm").as("updateProfile");
  cy.intercept("POST", "**/requestloan.htm").as("requestLoan");
  cy.intercept("GET", "**/about.htm").as("aboutPage");
  cy.intercept("GET", "**/services.htm").as("servicesPage");
  cy.intercept("GET", "**/admin.htm").as("adminPage");
  cy.intercept("GET", "**/contact.htm").as("contactPage");
});

// HOME
Given("je suis sur la page d'accueil ParaBank", () => {
  userData = buildUser();
  cy.log(`REGISTER USERNAME: ${userData.username}`);
  cy.log(`REGISTER SSN: ${userData.ssn}`);

  cy.viewport(1536, 960);
  cy.visit("https://parabank.parasoft.com/parabank/index.htm");
  cy.contains("Customer Login", { timeout: 20000 }).should("be.visible");
});

// REGISTER
When("je clique sur Register", () => {
  cy.get(SEL.auth.registerLink, { timeout: 15000 }).should("be.visible").click();
});

When("je remplis le formulaire Register", () => {
  fillRegisterForm(userData);
});

When("je soumets le formulaire Register", () => {
  submitRegisterWithRetry(3);
});

Then("le compte ParaBank est créé", () => {
  expect(userData, "userData doit exister").to.exist;
  expect(userData.username, "username doit exister").to.exist;

  cy.get("#rightPanel", { timeout: 15000 }).should("be.visible");
  cy.get("body").should("not.contain", "This username already exists.");
  cy.contains("Welcome", { timeout: 15000 }).should("be.visible");
  cy.contains(userData.username, { timeout: 15000 }).should("be.visible");
});



// ACCOUNTS OVERVIEW
When("je vais sur Accounts Overview", () => {
  cy.contains("Accounts Overview", { timeout: 15000 }).click();
  cy.wait("@overview", { timeout: 30000 });
});

Then("le tableau Accounts Overview est affiché", () => {
  cy.url().should("include", "overview.htm");
  cy.get(SEL.overview.table, { timeout: 15000 }).should("be.visible");
});

// ACCOUNT DETAILS
When("je clique sur le premier numéro de compte", () => {
  cy.get(SEL.overview.accountLink, { timeout: 15000 })
    .its("length")
    .should("be.gt", 0);

  cy.get(SEL.overview.accountLink).first().click();
  cy.wait("@activity", { timeout: 30000 });
});

Then("la page Account Details est affichée", () => {
  cy.url().should("include", "activity.htm");
  cy.get(SEL.activity.table, { timeout: 15000 }).should("be.visible");
});

// TRANSACTION DETAILS
When("je clique sur la première transaction", () => {
  cy.get(SEL.activity.transactionLink, { timeout: 15000 })
    .its("length")
    .should("be.gt", 0);

  cy.get(SEL.activity.transactionLink).first().click();
  cy.wait("@transaction", { timeout: 30000 });
});

Then("la page Transaction Details est affichée", () => {
  cy.url().should("include", "transaction.htm");
  cy.get(SEL.transaction.details, { timeout: 15000 }).should("contain.text", "Transaction Details");
});

// OPEN ACCOUNT
/*When("je vais sur Open New Account", () => {
  cy.get(SEL.openAccount.menu, { timeout: 15000 }).click();
});

When("j'ouvre un nouveau compte {string}", (type) => {
  const normalized = type.toUpperCase() === "SAVING" ? "SAVINGS" : "CHECKING";

  cy.get(SEL.openAccount.accountType, { timeout: 15000 }).select(normalized);
  cy.get(SEL.openAccount.fromAccount).find("option").its("length").should("be.gt", 0);
  cy.get(SEL.openAccount.submit).click();
});

Then("le compte est ouvert", () => {
  cy.get(SEL.openAccount.result, { timeout: 15000 }).should("contain.text", "Account Opened");
});*/

// TRANSFER FUNDS
When("je vais sur Transfer Funds", () => {
  cy.get(SEL.transfer.menu, { timeout: 15000 }).click();
});

When("je transfère {string}", (amount) => {
  cy.get(SEL.transfer.amount, { timeout: 15000 }).clear().type(amount);
  cy.get(SEL.transfer.fromAccount).find("option").its("length").should("be.gt", 0);
  cy.get(SEL.transfer.toAccount).find("option").its("length").should("be.gt", 0);
  cy.get(SEL.transfer.submit).click();
});

Then("le transfert est effectué", () => {
  cy.get(SEL.transfer.result, { timeout: 15000 }).should("contain.text", "Transfer Complete");
});

// BILL PAY
When("je vais sur Bill Pay", () => {
  cy.get(SEL.billPay.menu, { timeout: 15000 }).click();
});

When("je remplis le formulaire Bill Pay", () => {
  fillBillPayForm();
});

When("je soumets le paiement", () => {
  cy.get(SEL.billPay.submit).click();
});

Then("le paiement est effectué", () => {
  cy.get(SEL.billPay.result, { timeout: 15000 }).should("contain.text", "Bill Payment Complete");
});

// UPDATE PROFILE
When("je vais sur Update Contact Info", () => {
  cy.get(SEL.updateProfile.menu, { timeout: 15000 }).click();
});

When("je mets à jour le First Name", () => {
  const updatedName = `${userData.firstName}Updated`;
  userData.firstName = updatedName;
  cy.get(SEL.updateProfile.firstName, { timeout: 15000 }).clear().type(updatedName);
});

When("je soumets la mise à jour du profil", () => {
  cy.get(SEL.updateProfile.submit).click();
});

Then("le profil est mis à jour", () => {
  cy.get(SEL.updateProfile.result, { timeout: 15000 }).should("contain.text", "Profile Updated");
});

// REQUEST LOAN
When("je vais sur Request Loan", () => {
  cy.get(SEL.requestLoan.menu, { timeout: 15000 }).click();
});

When("je remplis le formulaire de prêt", () => {
  cy.get(SEL.requestLoan.amount, { timeout: 15000 }).clear().type("1000");
  cy.get(SEL.requestLoan.downPayment).clear().type("100");
  cy.get(SEL.requestLoan.fromAccount).find("option").its("length").should("be.gt", 0);
});

When("je soumets la demande de prêt", () => {
  cy.get(SEL.requestLoan.submit).click();
});

Then("le statut du prêt est affiché", () => {
  cy.get(SEL.requestLoan.result, { timeout: 15000 }).should(($el) => {
    const text = $el.text();
    expect(text).to.match(/Approved|Denied/);
  });
});

// TOP NAV
When("je vais sur About Us", () => {
  cy.get(SEL.topNav.about, { timeout: 15000 }).first().click();
});

Then("la page About Us est affichée", () => {
  cy.url().should("include", "about.htm");
});

When("je vais sur Services", () => {
  cy.get(SEL.topNav.services, { timeout: 15000 }).first().click();
  cy.wait("@servicesPage", { timeout: 30000 });
});

Then("la page Services est affichée", () => {
  cy.url().should("include", "services.htm");
});

When("je vais sur Products", () => {
  cy.contains("Products", { timeout: 15000 })
    .should("be.visible")
    .should("have.attr", "href")
    .and("include", "products");
});

Then("la page Products externe est affichée", () => {
  cy.contains("Products", { timeout: 15000 })
    .should("have.attr", "href")
    .and("include", "products");
});



When("je vais sur Locations", () => {
  cy.contains("Locations", { timeout: 15000 })
    .should("be.visible")
    .should("have.attr", "href")
    .and("include", "contacts.jsp");
});

Then("la page Locations externe est affichée", () => {
  cy.contains("Locations", { timeout: 15000 })
    .should("have.attr", "href")
    .and("include", "contacts.jsp");
});

When("je vais sur Admin Page", () => {
  cy.get(SEL.topNav.admin, { timeout: 15000 })
    .first()
    .scrollIntoView()
    .should("have.attr", "href", "admin.htm")
    .click({ force: true });

  cy.wait("@adminPage", { timeout: 30000 });
});
Then("la page Admin est affichée", () => {
  cy.url().should("include", "admin.htm");
});

// ICONES
When("je clique sur l’icône home", () => {
  cy.get(SEL.topNav.homeIcon, { timeout: 15000 })
    .first()
    .scrollIntoView()
    .should("have.attr", "href", "index.htm")
    .click({ force: true });
});

Then("la page index est affichée", () => {
  cy.url().should("include", "index.htm");
});

When("je clique sur l’icône about", () => {
  cy.get(SEL.topNav.aboutIcon, { timeout: 15000 })
    .first()
    .scrollIntoView()
    .should("have.attr", "href", "about.htm")
    .click({ force: true });
});

Then("la page about est affichée", () => {
  cy.url().should("include", "about.htm");
});

When("je clique sur l’icône contact", () => {
  cy.get(SEL.topNav.contactIcon, { timeout: 15000 })
    .first()
    .scrollIntoView()
    .should("have.attr", "href", "contact.htm")
    .click({ force: true });

  cy.wait("@contactPage", { timeout: 30000 });
});

Then("la page contact est affichée", () => {
  cy.url().should("include", "contact.htm");
});

// CUSTOMER CARE
When("je remplis le formulaire Customer Care", () => {
  fillCustomerCareForm(userData.firstName);
});

When("j’envoie le message Customer Care", () => {
  cy.get(SEL.customerCare.submit, { timeout: 15000 }).click();
});

Then("le message de remerciement est affiché", () => {
  cy.get(SEL.customerCare.result, { timeout: 15000 }).should("contain.text", "Thank you");
  cy.get(SEL.customerCare.result).should("contain.text", userData.firstName);
});

// LOGOUT
When("je me déconnecte de ParaBank", () => {
  cy.get(SEL.auth.logoutLink, { timeout: 15000 }).should("be.visible").click();
});

Then("je suis déconnecté de ParaBank", () => {
  cy.get(SEL.auth.username, { timeout: 15000 }).should("be.visible");
  cy.get(SEL.auth.password).should("be.visible");
  cy.get(SEL.auth.loginButton).should("be.visible");
});