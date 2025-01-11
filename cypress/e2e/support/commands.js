Cypress.Commands.add("login", (email, password) => {
    cy.request("POST", "/api/login", {
      email,
      password,
    }).then((response) => {
      localStorage.setItem("token", response.body.token);
    });
  });

Cypress.Commands.add("fillForm", (formData) => {
    Object.keys(formData).forEach((field) => {
      cy.get(`input[name="${field}"]`).type(formData[field]);
    });
  });
  

  Cypress.Commands.add("clickAndWait", (selector) => {
    cy.get(selector).click();
    cy.wait(500);
  });
  

  Cypress.Commands.add("mockApi", (endpoint, response) => {
    cy.intercept("GET", endpoint, { body: response });
  });
  