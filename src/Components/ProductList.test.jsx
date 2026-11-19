import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Listproduits from './ProductList';
import Store from '../Store';

describe('Listproduits Component', () => {

  it('should display products', () => {
    render(
      <Provider store={Store}>
        <MemoryRouter>
          <Listproduits />
        </MemoryRouter>
      </Provider>
    );

   expect(screen.getByText('Ordinateur portable')).toBeInTheDocument();
  });

  it('should display search input', () => {
    render(
      <Provider store={Store}>
        <MemoryRouter>
          <Listproduits />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByPlaceholderText('Rechercher un produit...')
    ).toBeInTheDocument();
  });

  it('should search for a product', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={Store}>
        <MemoryRouter>
          <Listproduits />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Rechercher un produit...');

    await user.type(input, 'Ordinateur');

expect(screen.getByText('Ordinateur portable')).toBeInTheDocument();
  });

  it('should display message when no product is found', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={Store}>
        <MemoryRouter>
          <Listproduits />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText('Rechercher un produit...');

    await user.type(input, 'ProduitInexistant');

    expect(screen.getByText('Aucun produit trouvé !')).toBeInTheDocument();
  });

});