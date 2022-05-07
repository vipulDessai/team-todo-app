import React from 'react';

import { createRoot } from 'react-dom/client';
import { screen, waitFor } from '@testing-library/react';

import App from '@/_components/App';
import { act } from 'react-dom/test-utils';

let container: null | HTMLDivElement = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('App component', () => {
  test('basic app loading', async () => {
    act(() => {
      createRoot(container).render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText(/all todos/i)).toBeTruthy();

      return true;
    });
  });
});
