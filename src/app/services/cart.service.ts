import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: { [key: string]: { quantity: number, totalPrice: number, description: string, image: string, price: number } } = {};

  addToCart(product: any): boolean {
    if (this.cart[product.name]) {
      this.cart[product.name].quantity++;
      this.cart[product.name].totalPrice += product.price;
    } else {
      this.cart[product.name] = {
        quantity: 1,
        totalPrice: product.price,
        description: product.description,
        image: product.image,
        price: product.price
      };
    }
    return true; // Ensure the method returns a boolean
  }

  removeFromCart(name: string) {
    if (this.cart[name]) {
      this.cart[name].quantity--;
      this.cart[name].totalPrice -= this.cart[name].price;
      if (this.cart[name].quantity === 0) {
        delete this.cart[name];
      }
      return true;
    }
    return false;
  }

  removeAllFromCart(name: string) {
    if (this.cart[name]) {
      const quantity = this.cart[name].quantity;
      delete this.cart[name];
      return quantity;
    }
    return 0;
  }
}
