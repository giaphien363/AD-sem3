import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, throwError } from 'rxjs';

import { Pagination, Product } from './product.model';

@Injectable()
export class ProductService {
  private url: string = 'https://localhost:44360/api/Products';

  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  getProductsPage(page: number) {
    return this.http
      .get<Pagination>(this.url + `?page=${page}`, {
        responseType: 'json',
      })
      .pipe(
        map((responseData) => {
          return responseData;
        }),
        catchError((errorRes) => {
          // Send to analytic serve
          return throwError(errorRes);
        })
      );
  }

  getProducts() {
    return this.http
      .get<Product[]>(this.url, {
        responseType: 'json',
      })
      .pipe(
        map((responseData) => {
          return responseData;
        }),
        catchError((errorRes) => {
          // Send to analytic serve
          return throwError(errorRes);
        })
      );
  }
  addProduct(product: Product) {
    return this.http.post(this.url, product, { observe: 'response' });
  }

  updateProduct(product: Product) {
    return this.http.put(this.url, product, { observe: 'response' });
  }

  deleteProduct(id: Number) {
    return this.http.delete(this.url + `/${id}`, { observe: 'response' });
  }
}
