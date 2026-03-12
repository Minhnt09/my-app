import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './products-admin.component.html'
})
export class ProductsAdminComponent implements OnInit {

  products:any[]=[];

  api="https://my-app-uc3a.onrender.com/products";

  newProduct:any={
    name:'',
    price:'',
    image:''
  };

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.loadProducts();
  }

  loadProducts(){
    this.http.get<any>(this.api).subscribe(res=>{
      this.products=res.data;
    });
  }

  addProduct(){
    this.http.post(this.api,this.newProduct).subscribe(()=>{
      this.loadProducts();
      this.newProduct={};
    });
  }

  deleteProduct(id:number){
    if(confirm("Delete product?")){
      this.http.delete(this.api+"/"+id).subscribe(()=>{
        this.loadProducts();
      });
    }
  }

}