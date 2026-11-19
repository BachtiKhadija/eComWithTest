
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import ProductForm from './ProductForm';
import Store from '../Store';

describe('ProductForm Component', () => {

  it('should display the add product form', () => {
    render(
      <Provider store={Store}>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Ajouter un produit')).toBeInTheDocument();
    expect(screen.getByLabelText('Intitulé')).toBeInTheDocument();
    expect(screen.getByLabelText('Prix (DH)')).toBeInTheDocument();
  });

  it('should add a new product', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={Store}>
        <MemoryRouter>
          <ProductForm />
        </MemoryRouter>
      </Provider>
    );

    await user.type(screen.getByLabelText('Intitulé'), 'Téléphone');
    await user.type(screen.getByLabelText('Prix (DH)'), '3000');

    await user.selectOptions(
      screen.getByLabelText('Catégorie'),
      'Téléphonie'
    );

    await user.type(
      screen.getByLabelText('Image (URL)'),
      'https://example.com/image.jpg'
    );

    await user.click(screen.getByRole('button', { name: /ajouter/i }));

    const produits = Store.getState().product.produits;

    expect(produits.some(p => p.intitule === 'Téléphone')).toBe(true);
  });

it('should display existing product information when editing', () => {
  render(
    <Provider store={Store}>
      <MemoryRouter initialEntries={['/products/1/edit']}>
        <Routes>
          <Route path="/products/:id/edit" element={<ProductForm />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Modifier un produit')).toBeInTheDocument();

  const produit = Store.getState().product.produits.find(p => p.id === 1);

  expect(screen.getByDisplayValue(produit.intitule)).toBeInTheDocument();
  expect(screen.getByDisplayValue(String(produit.prix))).toBeInTheDocument();
  expect(screen.getByDisplayValue(produit.image)).toBeInTheDocument();
  expect(screen.getByDisplayValue(produit.categorie)).toBeInTheDocument();
});
});
