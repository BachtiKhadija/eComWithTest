
import { describe, it, expect } from 'vitest';

import PanierReducer, {
  addToCart,
  removeFromCart,
  incrementQte,
  decrementQte
} from './PanierSlice';

import store from '../Store';

// Récupérer le state initial du panier
const initialState = store.getState().panier;

describe('Tests unitaires PanierSlice', () => {

  // Test 1 : Ajouter un produit au panier
  it('doit ajouter un produit au panier', () => {
    const produit = {
      id: 1,
      intitule: 'Ordinateur portable',
      prix: 7500,
      categorie: 'Informatique'
    };

    const newState = PanierReducer(
      initialState,
      addToCart(produit)
    );

    expect(newState.items).toHaveLength(1);

    expect(newState.items[0]).toEqual({
      ...produit,
      qte: 1
    });
  });

  // Test 2 : Incrémenter la quantité si le produit existe déjà
  it('doit incrémenter la quantité si le produit existe déjà', () => {
    const produit = {
      id: 1,
      intitule: 'Ordinateur portable',
      prix: 7500,
      categorie: 'Informatique'
    };

    let newState = PanierReducer(
      { items: [] },
      addToCart(produit)
    );

    newState = PanierReducer(
      newState,
      addToCart(produit)
    );

    expect(newState.items[0].qte).toBe(2);
  });

  // Test 3 : Supprimer un produit du panier
  it('doit supprimer un produit du panier', () => {
    const stateWithProducts = {
      items: [
        { id: 1, intitule: 'Ordinateur', qte: 1 },
        { id: 2, intitule: 'Smartphone', qte: 2 }
      ]
    };

    const newState = PanierReducer(
      stateWithProducts,
      removeFromCart(1)
    );

    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].id).toBe(2);
  });

  // Test 4 : Incrémenter la quantité d'un produit
  it('doit incrémenter la quantité d\'un produit', () => {
    const stateWithProduct = {
      items: [
        { id: 1, intitule: 'Ordinateur', qte: 1 }
      ]
    };

    const newState = PanierReducer(
      stateWithProduct,
      incrementQte(1)
    );

    expect(newState.items[0].qte).toBe(2);
  });

  // Test 5 : Décrémenter la quantité d'un produit
  it('doit décrémenter la quantité d\'un produit', () => {
    const stateWithProduct = {
      items: [
        { id: 1, intitule: 'Ordinateur', qte: 2 }
      ]
    };

    const newState = PanierReducer(
      stateWithProduct,
      decrementQte(1)
    );

    expect(newState.items[0].qte).toBe(1);
  });

  // Test 6 : Supprimer le produit si sa quantité atteint zéro
  it('doit supprimer le produit si sa quantité atteint zéro', () => {
    const stateWithProduct = {
      items: [
        { id: 1, intitule: 'Ordinateur', qte: 1 }
      ]
    };

    const newState = PanierReducer(
      stateWithProduct,
      decrementQte(1)
    );

    expect(newState.items).toHaveLength(0);
  });

});
