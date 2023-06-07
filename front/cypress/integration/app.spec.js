describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // 1
    cy.visit("http://localhost:3000/");

    // 2
    cy.get('a[href*="about"]').click();

    // 3
    cy.url().should("include", "/about");
  });
});
