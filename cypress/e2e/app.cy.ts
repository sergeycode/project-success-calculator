// Cypress E2E Test
describe('Navigation', () => {
  it('should navigate to the main page and see Calculator', () => {
    cy.visit('http://localhost:3000/');

    cy.findByRole('heading', {
      name: 'Introducing the Project Success Calculator',
    }).should('exist');

    cy.findByRole('heading', {
      name: 'The ultimate tool to calculate the success rate of your project.',
    }).should('exist');

    cy.findByText(
      "This multi-step calculator takes into account important factors such as project scope, project management tools, quality assurance, and budget to provide you with an accurate prediction of your project's success. No more guesswork, no more uncertainty. Get a clear picture of your project's success potential today with the Project Success Calculator."
    ).should('exist');

    cy.findByRole('button', { name: /Start/i }).should('exist');

    cy.findByRole('button', { name: /Start/i }).click();

    // Step 1
    cy.findByRole('heading', {
      name: 'Project Success Calculator',
    }).should('exist');
    // Step 1 indicator text
    cy.findByText('Step 1 of 4').should('exist');
    // Step 1 question
    cy.findByText('Do you have a clearly defined project scope:').should(
      'exist'
    );
    // Step 1 click first button
    cy.findByRole('button', { name: /Detailed description/i }).click();
    // Step 1 click next button
    cy.findByRole('button', { name: /Next/i }).click();

    // Step 2 indicator text
    cy.findByText('Step 2 of 4').should('exist');
    // Step 2 question
    cy.findByText(
      'What kind of project management tools do you use (select multiple):'
    ).should('exist');
    // Step 2 click first button
    cy.findByRole('button', { name: /Asana/i }).click();
    // Step 2 click next button
    cy.findByRole('button', { name: /Next/i }).click();

    // Step 3 indicator text
    cy.findByText('Step 3 of 4').should('exist');
    // Step 3 question
    cy.findByText('How will you manage Quality Assurance:').should('exist');
    // Step 3 click first button
    cy.findByRole('button', { name: /QA team/i }).click();
    // Step 3 click next button
    cy.findByRole('button', { name: /Next/i }).click();

    // Step 4 indicator text
    cy.findByText('Step 4 of 4').should('exist');
    // Step 4 question
    cy.findByText('What is your budget:').should('exist');
    // Step 4 click first button
    cy.findByRole('button', { name: /> \$50 000/i }).click();
    // Step 4 click next button
    cy.findByRole('button', { name: /Finish/i }).click();

    // Results
    cy.findByText('Results').should('exist');
    // Based on click the result should be 100%
    cy.findByText('100%').should('exist');

    // Fill out the form and submit
    cy.findByPlaceholderText(/Full Name/i).type('John Doe');
    cy.findByPlaceholderText(/Email/i).type('johndoe@example.com');
    cy.findByPlaceholderText(/Message/i).type('I love this calculator!');
    cy.findByRole('button', { name: /Submit/i }).click();

    // Thank you message
    cy.findByText('Thank you').should('exist');
    cy.findByText('for your interest.').should('exist');
    cy.findByText(
      'We will be in touch shortly to talk more about your project.'
    ).should('exist');

    // The new url should include "/?s=1" after submission
    cy.url().should('include', '/?s=1');
    // After visiting main page again url should still include "/?s=1" and be on Results section
    cy.visit('http://localhost:3000/');
    cy.url().should('include', '/?s=1');
    cy.findByText('Results').should('exist');

    // Check one more Result
    cy.findByRole('button', { name: /Start Over/i }).click();

    // Step 1 indicator text
    cy.findByText('Step 1 of 4').should('exist');
    // Step 1 click second button
    cy.findByRole('button', { name: /Good description/i }).click();
    // Step 1 click next button
    cy.findByRole('button', { name: /Next/i }).click();

    // Step 2 click 2 buttons
    cy.findByRole('button', { name: /Jira/i }).click();
    cy.findByRole('button', { name: /Private Slack Channel/i }).click();
    // Step 2 click next button
    cy.findByRole('button', { name: /Next/i }).click();

    // Step 3 click second button
    cy.findByRole('button', { name: /Marketing or design team/i }).click();
    // Step 3 click next button
    cy.findByRole('button', { name: /Next/i }).click();

    // Step 4 click first button
    cy.findByRole('button', { name: /\$30 000/i }).click();
    // Step 4 click next button
    cy.findByRole('button', { name: /Finish/i }).click();

    // Based on click the result should be 100%
    cy.findByText('65%').should('exist');
  });
});
