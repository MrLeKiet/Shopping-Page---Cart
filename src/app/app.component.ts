import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgFor, KeyValuePipe, NgIf} from '@angular/common';
import { CartService } from './services/cart.service';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, NgFor, KeyValuePipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  totalPrice: number = 0;

  constructor(public cartService: CartService) {}

  removeFromCart(name: string) {
    const itemRemoved = this.cartService.removeFromCart(name);
    if (itemRemoved) {
      this.increaseStock(name);
      this.updateTotalPrice();
    }
  }

  removeAllFromCart(name: string) {
    const quantityRemoved = this.cartService.removeAllFromCart(name);
    if (quantityRemoved > 0) {
      this.resetStock(name, quantityRemoved);
      this.updateTotalPrice();
    }
  }

  resetStock(name: string, quantity: number) {
    const product = this.products.find(prod => prod.name === name);
    if (product) {
      product.stock += quantity;
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  updateStock(name: string) {
    const product = this.products.find(prod => prod.name === name);
    if (product) {
      product.stock--;
    }
  }

  increaseStock(name: string) {
    const product = this.products.find(prod => prod.name === name);
    if (product) {
      product.stock++;
    }
  }

  updateTotalPrice() {
    this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice(): number {
    return Object.values(this.cartService.cart).reduce((total, item) => total + item.totalPrice, 0);
  }

  get cartNotEmpty(): boolean {
    return Object.keys(this.cartService.cart).length > 0;
  }

  products = [
    {
      name: 'Laptop',
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRjUrC507P3p7NZRHOTlTF00DeA-9UR7DmL27evT9OV9PKQpDYNHz66uOhcPzJlR-Gl16VwA7c6gFitaf7ClXmNajzkDMu4K92YAv2vUiikwaFpqP4qamESsFuizrlxNb0LuThFLhg1euM&usqp=CAc',
      price: 240,
      description: 'This is a product description',
      stock: 5
    },
    {
      name: 'Potatoes',
      image: 'https://via.placeholder.com/150',
      price: 6,
      description: 'This is a product description',
      stock: 50
    },
    {
      name: 'Rose',
      image: 'https://via.placeholder.com/150',
      price: 13,
      description: 'This is a product description',
      stock: 20
    },
    {
      name: 'Carrot',
      image: 'https://via.placeholder.com/150',
      price: 3,
      description: 'This is a product description',
      stock: 100
    },
    {
      name: 'Tomato',
      image: 'https://via.placeholder.com/150',
      price: 5,
      description: 'This is a product description',
      stock: 30
    },
    {
      name: 'Cucumber',
      image: 'https://via.placeholder.com/150',
      price: 2,
      description: 'This is a product description',
      stock: 40
    }
  ];
}
