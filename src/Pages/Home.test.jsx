import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Home from './Home';
import Store from '../Store';

describe('Home Component', () => {

  it('should display the title', () => {
    render(
      <Provider store={Store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Notre boutique')).toBeInTheDocument();
  });

  it('should display Filter component', () => {
    render(
      <Provider store={Store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Catégories')).toBeInTheDocument();
  });

  it('should display Listproduits component', () => {
    render(
      <Provider store={Store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByPlaceholderText('Rechercher un produit...')
    ).toBeInTheDocument();
  });

});
