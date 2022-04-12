import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from './services/product.service';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private confirmationService: ConfirmationService, private productService: ProductService) { }

  name = new FormControl("");
  description = new FormControl("");
  price = new FormControl("")
  quantity = new FormControl("")
  id = new FormControl("")

  products: any

  showProductForm: boolean = false;
  createProductModel: boolean;
  msgs: Message[] = [];
  deleteStatus: any
  messageTitle: any
  message: any
  

  ngOnInit() {
    this.getAllProduct()
  }

  wait(sec) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, sec);
    });
  }

  showForm() {
    this.showProductForm = !this.showProductForm
  }

  messageModel(title, mess) {
    this.createProductModel = true;

    this.message = mess
    this.messageTitle = title
  }

  addToCart(productId){
    let data = JSON.parse(window.localStorage.getItem('User'))
    this.productService.addToCart(productId, data.id).subscribe(() => {
      this.wait(1)
      this.messageModel("success", "success")
      this.ngOnInit()
      this.showProductForm = false
      console.log("success")
    },
    (error) => {
      this.wait(1)
      this.messageModel(error.name, error.statusText)
    })
  }

  getAllProduct() {
    this.productService.getProducts().subscribe((data) => {
      
      this.products = data
    },
    (error) => {
      this.messageModel(error.name, error.statusText)
    })
  }
  

  addProduct() {
    this.productService.createProduct(this.name.value, this.description.value, this.price.value, this.quantity.value).subscribe(() => {
      this.wait(1)
      this.messageModel("success", "success")
      this.ngOnInit()
      this.showProductForm = false
    },
    (error) => {
      this.wait(1)
      this.messageModel(error.name, error.statusText)
    })
  }

  deleteProduct(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(id).subscribe(
          (data) => {
            this.deleteStatus = data
            if (this.deleteStatus.message === 'Deleted') {
              this.wait(1)
              this.ngOnInit()
              this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have successfully deleted' }];
            }
          },

          (error) => {
            this.wait(1)
            this.messageModel(error.name, error.statusText)
          })
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have cancled' }];
      },
    });
  }

  updateProduct(product) {
    console.log(product)
    this.productService.updateProduct(this.name.value, this.description.value, this.price.value, this.quantity.value, this.id.value).subscribe(data => {
      if (data > 0) {
        this.addProduct(),
          this.showProductForm = false
      } else {
        console.log('something went wrong')
      }
    })
  }

}
