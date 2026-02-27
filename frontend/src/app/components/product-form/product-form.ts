import { Component, inject, output, Output, signal, Signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  productAdded = output<void>();
  loading = signal(false);
  successMessage: WritableSignal<string | null> = signal(null);
  errorMessage: WritableSignal<string | null> = signal(null);

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  get name() {
    return this.form.get('name');
  } 
  get description() {
    return this.form.get('description');
  }   
  get price() {
    return this.form.get('price');
  } 
  
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } 
    this.loading.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);
    this.productService.addProduct(this.form.value as any).subscribe({
      next: () => { 
        this.successMessage.set('Produit ajouté avec succès !');
        this.form.reset({ name: '', description: '', price: 0 });
        this.productAdded.emit();
        this.loading.set(false); 
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.loading.set(false);
        console.error('Error adding product:', error);
      }
    });
  }
}
