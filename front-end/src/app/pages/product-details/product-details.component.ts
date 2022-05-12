import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId:any
  product:any
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  this.getProductDetails()

  }

  getProductDetails() {
    this.productId =this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.getProductDetail(this.productId).subscribe((data) => {
      this.product = data[0]
      console.log(this.product)
    },
    (error) => {
      console.log(error.name, error.statusText)
    })
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
    this.productService.addToCart(productId, data.id, quantity).subscribe(() => {

      this.ngOnInit()

    },
    (error) => {
     console.log(error.name, error.statusText)
    })
  }

}
