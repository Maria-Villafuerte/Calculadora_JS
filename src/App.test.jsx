import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('Calculator Tests', () => {
  test('Divide by 0', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('button-8'));
    fireEvent.click(screen.getByTestId('button-/'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-='));
    expect(screen.getByTestId('display')).toHaveTextContent('ERROR');
  });

  test('Negative result', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button-2'));
    fireEvent.click(screen.getByTestId('button--'));
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-='));
    expect(screen.getByTestId('display')).toHaveTextContent('ERROR');
  });

  test('Multiple operators without numbers', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('button-+'));
    fireEvent.click(screen.getByTestId('button-*'));
    fireEvent.click(screen.getByTestId('button-='));
    expect(screen.getByTestId('display')).toHaveTextContent('ERROR');
  });

  test('Error display persists', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('button-3'));
    fireEvent.click(screen.getByTestId('button--'));
    fireEvent.click(screen.getByTestId('button-5'));
    fireEvent.click(screen.getByTestId('button-='));
    expect(screen.getByTestId('display')).toHaveTextContent('ERROR');
    fireEvent.click(screen.getByTestId('button-1'));
    expect(screen.getByTestId('display')).toHaveTextContent('1');
  });
  
  test('Error more than 9 digits', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('button-1'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-*'));
    fireEvent.click(screen.getByTestId('button-1'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-0'));
    fireEvent.click(screen.getByTestId('button-='));
    expect(screen.getByTestId('display')).toHaveTextContent('ERROR');
  });
});
