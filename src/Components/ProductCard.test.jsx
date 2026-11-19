
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ProductCard from './ProductCard';
import Store from '../Store';

// Produit utilisé pour les tests
const produit = {
  id: 1,
  intitule: 'Ordinateur',
  categorie: 'Informatique',
  prix: 5000,
  image: 'ordinateur.jpg'
};

describe('ProductCard Component', () => {

  // Test 1 : vérifier les informations du produit
  it('should display product information', () => {
    render(
      <Provider store={Store}>
        <MemoryRouter>
          <ProductCard produit={produit} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Ordinateur')).toBeInTheDocument();
    expect(screen.getByText('Informatique')).toBeInTheDocument();
    expect(screen.getByText('5000 DH')).toBeInTheDocument();
  });

  // Test 2 : vérifier l'image
  it('should display product image', () => {
    render(
      <Provider store={Store}>
        <MemoryRouter>
          <ProductCard produit={produit} />
        </MemoryRouter>
      </Provider>
    );

    const image = screen.getByAltText('Ordinateur');

    expect(image).toHaveAttribute('src', 'ordinateur.jpg');
  });

  // Test 3 : vérifier les boutons
  it('should display all buttons', () => {
    render(
      <Provider store={Store}>
        <MemoryRouter>
          <ProductCard produit={produit} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /ajouter/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('link', { name: /edit/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('button', { name: /delete/i }))
      .toBeInTheDocument();
  });

  // Test 4 : vérifier l'ajout au panier
  it('should add product to cart', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={Store}>
        <MemoryRouter>
          <ProductCard produit={produit} />
        </MemoryRouter>
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /ajouter/i }));

    const items = Store.getState().panier.items;

    expect(items.some(item => item.intitule === 'Ordinateur')).toBe(true);
  });

  // Test 5 : vérifier la confirmation de suppression
  it('should ask confirmation before deleting product', async () => {
    window.confirm = vi.fn();

    const user = userEvent.setup();

    render(
      <Provider store={Store}>
        <MemoryRouter>
          <ProductCard produit={produit} />
        </MemoryRouter>
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(window.confirm).toHaveBeenCalled();
  });

});
