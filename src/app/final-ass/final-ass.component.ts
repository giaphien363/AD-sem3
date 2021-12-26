import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-final-ass',
  templateUrl: './final-ass.component.html',
  styleUrls: ['./final-ass.component.css'],
})
export class FinalAssComponent implements OnInit {
  message: string = '';
  currentPage: number = 1;
  totalPage: number = 1;

  isLoader: boolean = true;
  isDisabled: boolean = true;
  isUpdate: boolean = false;

  products: Product[] = [];

  productForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl(null, [Validators.required, Validators.min(1000)]),
    quantity: new FormControl(null, [Validators.required, Validators.min(0),Validators.max(30)]),
  });

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProduct(1);

    // validator
    this.productForm.statusChanges.subscribe((value) => {
      if (value === 'VALID') {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    });
  }

  loadProduct(page: number) {
    this.productService.getProductsPage(page).subscribe(
      (pros) => {
        this.totalPage = pros.metadata.totalPages;
        this.currentPage = pros.metadata.currentPage;

        this.products = [];

        pros.products.forEach((pro) => {
          this.products.push(pro);
        });
        this.isLoader = false;
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  }

  onSubmit() {
    this.isLoader = true;
    setTimeout(() => {
      let item = this.productForm.value;
      let genId = this.isUpdate ? item.id : 0;

      let newProduct = new Product(
        genId,
        item.name,
        item.description,
        item.price,
        item.quantity
      );

      if (!this.isUpdate) {
        this.productService.addProduct(newProduct).subscribe(
          (res) => {
            if (res.status === 201) {
              this.loadProduct(1);
              this.setMessage('Create successfully!!!');
            }
          },
          (err) => {
            console.log('err: ', err);
          }
        );
      } else {
        this.productService.updateProduct(newProduct).subscribe(
          (res) => {
            if (res.status === 200) {
              let index = this.products.findIndex((ele) => ele.id === genId);
              if (index != -1) {
                this.products[index] = newProduct;
                this.setMessage('Update successfully!!!');
              }
            }
          },
          (err) => {
            console.log('err: ', err);
          }
        );
      }

      this.isDisabled = true;
      this.isUpdate = false;
      this.isLoader = false;
      this.productForm.reset();

    }, 500);
  }

  getProduct(id: Number): any {
    let index = this.products.findIndex((ele) => ele.id === id);
    if (index === -1) return null;
    return this.products[index];
  }

  updateProduct(id: Number) {
    this.isUpdate = true;

    let current = this.getProduct(id);
    if (current != null) {
      this.productForm.patchValue({
        name: current.name,
        price: current.price,
        quantity: current.quantity,
        id: current.id,
        description: current.description,
      });
    }
  }
  
  resetForm(){
    this.isUpdate = false;
    this.productForm.reset();
  }

  deleteProduct(id: Number) {
    if (!window.confirm('Are you sure?')) return;

    this.productService.deleteProduct(id).subscribe(
      (res) => {
        if (res.status === 200) {
          let index = this.products.findIndex((ele) => ele.id === id);
          if (index != -1) {
            this.products.splice(index, 1);
          }
        }
      },
      (err) => {
        console.log('err: ', err);
      }
    );
  }

  prePage() {
    this.currentPage -= 1;
    this.loadProduct(this.currentPage);
  }
  nextPage() {
    this.currentPage += 1;
    this.loadProduct(this.currentPage);
  }

  setMessage(str: string) {
    this.message = str;
  }

  text_truncate(str: String) {
    if (str == null) {
      return str;
    }
    if (str.length > 20) {
      return str.substring(0, 20) + ' ...';
    } else {
      return str;
    }
  }
}
