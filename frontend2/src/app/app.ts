import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductCard } from './components/product-card/product-card';
import { ProductForm } from './components/product-form/product-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList, ProductCard, ProductForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app');
}
