
import { describe, it, expect } from 'vitest';

import ProductReducer, {
  addProduit,
  updateProduit,
  deleteProduit,
  setSearchTerm,
  setSelectedCategory
} from './ProductSlice';

import store from '../Store';

// Récupérer le state initial de ProductSlice
const initialState = store.getState().product;

describe('Tests unitaires ProductSlice', () => {

  // Test 1 : Ajouter un nouveau produit
  it('doit ajouter un nouveau produit', () => {
    const produit = {
      intitule: 'Tablette',
      prix: 2500,
      categorie: 'Informatique',
      image: 'tablette.jpg'
    };

    const newState = ProductReducer(
      initialState,
      addProduit(produit)
    );

    expect(newState.produits.length).toBe(4);
    expect(newState.produits[3].intitule).toBe('Tablette');
    expect(newState.produits[3].id).toBeDefined();
  });

  // Test 2 : Modifier un produit existant
  it('doit modifier un produit existant', () => {
    const produitModifie = {
      ...initialState.produits[0],
      intitule: 'Ordinateur Gaming',
      prix: 9500
    };

    const newState = ProductReducer(
      initialState,
      updateProduit(produitModifie)
    );

    expect(newState.produits[0].intitule).toBe('Ordinateur Gaming');
    expect(newState.produits[0].prix).toBe(9500);
  });

  // Test 3 : Supprimer un produit
  it('doit supprimer un produit', () => {
    const newState = ProductReducer(
      initialState,
      deleteProduit(1)
    );

    expect(newState.produits).toHaveLength(2);
    expect(
      newState.produits.find(p => p.id === 1)
    ).toBeUndefined();
  });

  // Test 4 : Modifier le terme de recherche
  it('doit modifier le terme de recherche', () => {
    const newState = ProductReducer(
      initialState,
      setSearchTerm('Smartphone')
    );

    expect(newState.searchTerm).toBe('Smartphone');
  });

  // Test 5 : Modifier la catégorie sélectionnée
  it('doit modifier la catégorie sélectionnée', () => {
    const newState = ProductReducer(
      initialState,
      setSelectedCategory('Informatique')
    );

    expect(newState.selectedCategory).toBe('Informatique');
  });

});
