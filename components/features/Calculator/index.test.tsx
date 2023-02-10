import { render } from '@testing-library/react';
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
  it('Inital screen exists if With Start', () => {
    const { queryByTestId } = render(
      <Calculator theme={calculatorTheme} withStart={true} />
    );

    expect(queryByTestId(/initial-screen/i)).toBeTruthy();
  });

  it('Inital screen does not exist if Without Start', () => {
    const { queryByTestId } = render(
      <Calculator theme={calculatorTheme} withStart={false} />
    );

    expect(queryByTestId(/initial-screen/i)).toBeFalsy();
  });
});
