import React from 'react';

import { render } from 'react-dom';
import { screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from '@/_components/App';

let container: null | HTMLDivElement = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
afterEach(() => {
  if (container) {
    unmountComponentAtNode(container as Element);
    container.remove();
    container = null;
  }
});
describe('App component', () => {
  test('basic app loading', async () => {
    render(<App />, container);

    expect(screen.getByText(/app/i)).toBeTruthy();
  });
});
