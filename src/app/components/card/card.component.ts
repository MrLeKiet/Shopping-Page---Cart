import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CardButtonComponent } from './card-button/card-button/card-button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardButtonComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'] // Fix typo here
})
export class CardComponent {
  constructor(public cartService: CartService) {}

  addToCart() {
    const itemAdded = this.cartService.addToCart({
      name: this.name,
      price: this.price,
      stock: this.stock,
      image: this.image,
      description: this.description
    });
    if (itemAdded) {
      this.updateStock(this.name);
      this.updateTotalPrice();
    }
  }

  @Input() updateStock: (name: string) => void = () => {};
  @Input() increaseStock: (name: string) => void = () => {};
  @Input() updateTotalPrice: () => void = () => {};
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() price: number = 0;
  @Input() stock: number = 0;
  @Input() image: string = '';
}
