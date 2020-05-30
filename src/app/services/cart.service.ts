import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(theCartItem: CartItem) {

    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      for (let tempCartItem of this.cartItems) {

        if (tempCartItem.id == theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
      alreadyExistInCart = (existingCartItem != undefined);

    }
    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotal();
  }
  computeCartTotal() {
    let totalPriceValue : number = 0;
    let totalQuantityValue : number = 0;


    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;

      console.log(`toral Price Value : ${totalPriceValue}`);
    }


    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue , totalQuantityValue);
  }
  
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('content of the cart');

    for(let tempCartItem of this.cartItems){

      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity},unit price: ${tempCartItem.unitPrice}, total: ${subTotalPrice}`);

    }

    console.log(`totalPrice: ${totalPriceValue}, totalQuantity: ${totalQuantityValue}`);
  }
}
