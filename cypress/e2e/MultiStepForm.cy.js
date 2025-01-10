describe("MultiStepForm E2E Test", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("should complete the form and submit successfully", () => {
      // Step 1: Fill in personal details
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('button[type="button"]').contains("Next").click();
  
      // Step 2: Fill in work details
      cy.get('input[name="email"]').type("john.doe@example.com");
      cy.get('input[name="jobTitle"]').type("Software Engineer");
      cy.get('input[name="companyName"]').type("TechCorp");
      cy.get('button[type="button"]').contains("Next").click();
  
      // Step 3: Fill in education details
      cy.get('input[name="schoolName"]').type("Tech University");
      cy.get('input[name="degree"]').type("MSc Computer Science");
      cy.get('button[type="submit"]').contains("Submit").click();
  
      // Check if the form is submitted successfully
      cy.contains("Form submitted successfully!").should("be.visible");
    });
  
    it("should show validation errors for empty fields", () => {
      // Step 1: Try to submit the form without filling in any fields
      cy.get('button[type="button"]').contains("Next").click();
      cy.contains("First Name is required").should("be.visible");
      cy.contains("Last Name is required").should("be.visible");
  
      // Fill field with invalid email
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('button[type="button"]').contains("Next").click();
      cy.get('input[name="email"]').type("invalid-email");
      cy.get('button[type="button"]').contains("Next").click();
      cy.contains("Email must be valid").should("be.visible");
    });
  
    it("should save progress and restore it on page reload", () => {
      // Fill Step 1
      cy.get('input[name="firstName"]').type("John");
      cy.get('input[name="lastName"]').type("Doe");
      cy.get('button[type="button"]').contains("Next").click();
  
      // Load the page again
      cy.reload();
  
      // Make sure that these fields are still filled
      cy.get('input[name="firstName"]').should("have.value", "John");
      cy.get('input[name="lastName"]').should("have.value", "Doe");
    });
  
    it("should render properly on different screen sizes", () => {
      const viewports = [
        { device: "iPhone 6", width: 375, height: 667 },
        { device: "iPad", width: 768, height: 1024 },
        { device: "Desktop", width: 1440, height: 900 },
      ];
  
      viewports.forEach(({ device, width, height }) => {
        cy.viewport(width, height);
        cy.visit("/");
  
        // Check if form is visible
        cy.get("form").should("be.visible");
      });
    });
  });
  