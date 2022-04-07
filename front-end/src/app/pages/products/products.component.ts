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
  id = new FormControl("")

  showProductForm:boolean = false;

  ngOnInit() {
    this.getProduct()
  }

  getProduct(){
    this.productService.getProducts().subscribe(data => {
      this.products = data
      console.log(this.products)
    })
  }

  async addProduct() {
    this.productService.createProduct(this.name.value, this.description.value, this.price.value, this.quantity.value ).subscribe(data => {
        console.log(data)
      
        this.showProductForm = false
      
    
    })
    this.getProduct()

  }

  updateProduct() {
    this.productService.updateProduct(this.name.value, this.description.value, this.price.value, this.quantity.value, this.id.value).subscribe(data => {
     if (data>0){
      this.addProduct()  
    }    
      this.showProductForm = false
    })
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe((data) => {
     this.getProduct(),
     console.log(data)
    })
  }
  
  showForm(){
    this.showProductForm = !this.showProductForm
  }
}
