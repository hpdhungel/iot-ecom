import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private productService: ProductService) { }

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


}
