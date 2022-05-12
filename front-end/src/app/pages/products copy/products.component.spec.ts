import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent1 } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent1;
  let fixture: ComponentFixture<ProductsComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent1 ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
