import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from 'components/features/Calculator';

const calculatorTheme = {
  primary: 'lightTeal',
  secondary: 'teal',
  text: 'grey',
  dark: 'black',
  light: 'lightPeach',
  border: '.125rem solid #333',
  boxShadow: '.1875rem .1875rem 0 0 #333',
};

describe('Calculator', () => {
  it('Inital screen exists withStart', () => {
    const { queryByTestId } = render(
      <Calculator theme={calculatorTheme} withStart={true} />
    );

    expect(queryByTestId(/initial-screen/i)).toBeTruthy();
  });

  it('Inital screen does not exist withStart=false', () => {
    const { queryByTestId } = render(
      <Calculator theme={calculatorTheme} withStart={false} />
    );

    expect(queryByTestId(/initial-screen/i)).toBeFalsy();
  });

  it('Step 1 is correct step', () => {
    const { queryByTestId } = render(
      <Calculator theme={calculatorTheme} withStart={false} />
    );
    expect(queryByTestId(/step-text/i)?.textContent).toMatch(/1/);
  });

  it('Step 1 Next Button disabled', () => {
    const { queryByTestId } = render(
      <Calculator theme={calculatorTheme} withStart={false} />
    );
    expect(queryByTestId(/next/i)).toBeDisabled();
  });

  it('Step 1 Previous Button is hidden and disabled', () => {
    const { queryByTestId } = render(
      <Calculator theme={calculatorTheme} withStart={false} />
    );
    expect(queryByTestId(/prev/i)).toBeDisabled();
    expect(queryByTestId(/prev/i)).not.toBeVisible();
  });

  it('Click one of choices, Next enabled', async () => {
    const { queryByTestId } = render(
      <Calculator theme={calculatorTheme} withStart={false} />
    );
    const button = queryByTestId(/step-choice-0/);
    fireEvent.click(button as HTMLElement);

    expect(await screen.findByTestId(/next/i)).toBeEnabled();
  });
});
