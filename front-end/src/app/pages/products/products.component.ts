import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any

  constructor(private productService: ProductService) {  }
  name = new FormControl("");
  description = new FormControl("");
  price = new FormControl("")
  quantity = new FormControl("")

  showProductForm:boolean = false;


  ngOnInit() {
    this.getProduct()
  }
  addProduct() {
    this.productService.createProduct(this.name.value, this.description.value, this.price.value, this.quantity.value ).subscribe(data => {
      data
      console.log(data)
    })
  }
  getProduct(){
    this.productService.getProducts().subscribe(data => {
      this.products = data
    })
  }
  showForm(){
    console.log(this.showProductForm)

    this.showProductForm = !this.showProductForm
  }
}
