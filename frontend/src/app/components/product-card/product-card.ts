import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  delete = output<number>();
}
