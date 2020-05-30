import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/categories';

  constructor(private http:HttpClient) { }

  getProduct(productId: number) : Observable<Product> {
    const getProdUrl = `${this.baseUrl}/${productId}`;
    return this.http.get<Product>(getProdUrl);
  }

  getProductList(currentCategoryId : number):Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/category/${currentCategoryId}`;
    return this.http.get<Product[]>(searchUrl);
  }


  searchProduct(theKeyword : string):Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/${theKeyword}`;
    return this.http.get<Product[]>(searchUrl);
  }

  getProductCategories():Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(this.categoryUrl);
  }
}
