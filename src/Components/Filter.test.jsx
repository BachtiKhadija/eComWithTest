
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Filter from './Filter';
import Store from '../Store';

describe('Filter Component', () => {

  // Test 1 : vérifier le titre
  it('should display Categories title', () => {
    render(
      <Provider store={Store}>
        <Filter />
      </Provider>
    );

    expect(screen.getByText('Catégories')).toBeInTheDocument();
  });

  // Test 2 : vérifier la catégorie Toutes
  it('should display Toutes category', () => {
    render(
      <Provider store={Store}>
        <Filter />
      </Provider>
    );

    expect(screen.getByLabelText('Toutes')).toBeInTheDocument();
  });

  // Test 3 : vérifier les catégories des produits
  it('should display product categories', () => {
    render(
      <Provider store={Store}>
        <Filter />
      </Provider>
    );

    expect(screen.getByLabelText('Informatique')).toBeInTheDocument();
  });

  // Test 4 : vérifier le changement de catégorie
  it('should change selected category when clicked', async () => {
    const user = userEvent.setup();

    render(
      <Provider store={Store}>
        <Filter />
      </Provider>
    );

    await user.click(screen.getByLabelText('Informatique'));

    expect(Store.getState().product.selectedCategory).toBe('Informatique');
  });

});
