import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './services/product.service';
import { MenuItem, Message, MessageService, SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private confirmationService: ConfirmationService, 
    private productService: ProductService,  private router: Router,
    private messageService: MessageService
    ) { }

  // name = new FormControl("", [Validators.required]);
  // description = new FormControl("", [Validators.required]);
  // price = new FormControl("", [Validators.required])
  // quantity = new FormControl("", [Validators.required])
  // id = new FormControl("", [Validators.required])

  productForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    imgUrl: new FormControl("111"),

    price: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required]),
    product_id: new FormControl("", [Validators.required])

  }); 


  products: any
  product: any

  showProductForm: boolean = false;
  updateProductForm:boolean = false
  createProductModel: boolean;
  msgs: Message[] = [];
  deleteStatus: any
  messageTitle: any
  message: any
  showCardButton: boolean
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;
  items: MenuItem[];
  user:any
  admin:boolean


  ngOnInit() {
    
    this.getUser()
    this.getAllProduct()
    this.productButton()
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
  ];

  }

  wait(sec) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, sec);
    });
  }

  getUser(){
    if(window.localStorage.getItem('User')){
    this.user = JSON.parse(window.localStorage.getItem('User'))
    this.admin = this.user.admin
  }
  }

  showForm() {
    this.updateProductForm = false
    this.showProductForm = true
    this.productForm.get('name').setValue('')
    this.productForm.get('description').setValue('')
    this.productForm.get('price').setValue('')
    this.productForm.get('quantity').setValue('')
    this.productForm.get('product_id').setValue('')
    this.productForm.get('imgUrl').setValue('')

  }

  showUpdateForm(p){
    this.updateProductForm = true
    this.showProductForm = true
    this.product = p
    this.productForm.get('name').setValue(this.product.name)
    this.productForm.get('description').setValue(this.product.description)
    this.productForm.get('price').setValue(this.product.price)
    this.productForm.get('quantity').setValue(this.product.quantity)
    this.productForm.get('imgUrl').setValue(this.product.img_url)
    this.productForm.get('product_id').setValue(this.product.product_id)

  }

  messageModel(title, mess) {
    this.createProductModel = true;
    this.message = mess
    this.messageTitle = title
    this.showCardButton= true

  }

  productDetails(id){
    console.log(id)
    this.router.navigate[`product/${id}`]
  }

  addToCart(productId, productName){
    let data = JSON.parse(window.localStorage.getItem('User'))
    console.log(data.id)
    if(!window.localStorage.getItem('User')){
      this.router.navigate(['login'])
    }
    let quantity = 1
    //get cart info
    //if priduct id exit->update quentity
    //else insert new table
    this.productService.addToCart(productId, data.id, quantity).subscribe(() => {
      this.wait(1)
      this.messageModel(`Success`, `${productName} is successfully added to the cart.`)
      this.ngOnInit()
      this.showProductForm = false
      this.showCardButton =false
    },
    (error) => {
      this.wait(1)
      this.messageModel(error.name, error.statusText)
    })
  }

  getAllProduct() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data
      console.log(this.products)
    },
    (error) => {
      this.messageModel(error.name, error.statusText)
    })
  }

  goToCard(){
    this.router.navigate(['/cart'])
  }

  productButton(){
    this.items = [
      {
          icon: 'pi pi-pencil',
          command: (e) => {
                       console.log(e)

              // this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
     
      {
          icon: 'pi pi-trash',
          command: () => {
            this.showUpdateForm(this.product)
              this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      }
  ];
  }

  addProduct() {
    this.productService.createProduct(
      this.productForm.get('name').value, 
      this.productForm.get('description').value, 
      this.productForm.get('imgUrl').value, 

      this.productForm.get('price').value, 

      this.productForm.get('quantity').value).subscribe(() => {
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

  updateProduct() {
    this.productService.updateProduct(
      this.productForm.get('name').value, 
      this.productForm.get('description').value, 
      this.productForm.get('imgUrl').value,
      this.productForm.get('price').value, 
      this.productForm.get('quantity').value, 
      this.productForm.get('product_id').value
      ).subscribe(data => {
      if (data) {
        this.getAllProduct(),
          this.showProductForm = false
      } else {
        console.log('something went wrong')
      }
    })
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

}
