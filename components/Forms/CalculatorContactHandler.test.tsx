import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalculatorContactHandler from './CalculatorContactHandler';

const calculatorTheme = {
  primary: 'lightTeal',
  secondary: 'teal',
  text: 'grey',
  dark: 'black',
  light: 'lightPeach',
  border: '.125rem solid #333',
  boxShadow: '.1875rem .1875rem 0 0 #333',
};

describe('Calculator Contact Form', () => {
  it('On intial render Submit is enabled', () => {
    render(
      <CalculatorContactHandler
        title="Ready to Start Your Project?"
        theme={calculatorTheme}
        buttonText="Submit"
        completed={true}
      />
    );

    expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
  });

  it('On intial render on Submit click if no name and email, button is disabled', async () => {
    render(
      <CalculatorContactHandler
        title="Ready to Start Your Project?"
        theme={calculatorTheme}
        buttonText="Submit"
        completed={true}
      />
    );
    const button = screen.getByRole('button', { name: /submit/i });

    // Works with Formik
    await act(async () => {
      fireEvent.click(button);
    });

    expect(
      await screen.findByRole('button', { name: /submit/i })
    ).toBeDisabled();
  });

  it('if name and email is entered, Submit is enabled', async () => {
    render(
      <CalculatorContactHandler
        title="Ready to Start Your Project?"
        theme={calculatorTheme}
        buttonText="Submit"
        completed={true}
      />
    );

    userEvent.type(screen.getByPlaceholderText(/full name/i), 'John Doe');
    userEvent.type(
      screen.getByPlaceholderText(/email/i),
      'johndoe@example.com'
    );

    expect(
      await screen.findByRole('button', { name: /submit/i })
    ).toBeEnabled();
  });
});
