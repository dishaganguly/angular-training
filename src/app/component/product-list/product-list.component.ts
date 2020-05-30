import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[];
  currentCategoryId : number;
  SearchMode : boolean;
  page:number = 1;
  constructor(private productService : ProductService, 
              private cartService : CartService,
              private route:ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe(() =>{
      this.showProducts();
    });
    
  }

  showProducts(){
    this.SearchMode = this.route.snapshot.paramMap.has("keyword");
    if(this.SearchMode){
      this.handleSearchProduct();
    }
    else{
      this.handleListProduct();
    }
  }


  handleSearchProduct(){
    const theKeyword : string = this.route.snapshot.paramMap.get("keyword");
    this.productService.searchProduct(theKeyword).subscribe(
      data =>{
        this.products = data;
      });
  }


  handleListProduct(){
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId = 1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  addToCartProduct(theProduct : Product){
    console.log(`${theProduct.name}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}
