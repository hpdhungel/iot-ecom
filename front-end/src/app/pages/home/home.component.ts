import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private productService: ProductService,  private router: Router,) { }

  ngOnInit(): void {
    this.getAllProduct()
  }
  products: any


  getAllProduct() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data
      console.log(this.products)
    },
    (error) => {
      console.log(error.name, error.statusText)
    })
  }

  wait(sec) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, sec);
    });
  }

  addToCart(productId){
    let data = JSON.parse(window.localStorage.getItem('User'))
    console.log(data.id)
    if(!window.localStorage.getItem('User')){
      this.router.navigate(['login'])
    }
    let quantity = 1
    //get cart info
    //if priduct id exit->update quentity
    //else insert new table
    this.productService.addToCart(productId, data.id,quantity).subscribe(() => {
      this.wait(1)
      this.ngOnInit()

    },
    (error) => {
      this.wait(1)
    })
  }

}
