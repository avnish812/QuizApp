import { Component, OnInit } from '@angular/core';
import { QuiztopicsService } from 'src/app/core/services/quiztopics.service';
QuiztopicsService
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  myProductDetails:any
  constructor(
    private qts: QuiztopicsService
  ){}

  showtable:boolean=false


ngOnInit(): void {
this.getprodId()
}
getprodId(){
  this.qts.getAllProducts().subscribe((data)=>{
    this.myProductDetails = data;
    console.log(data)
  })
}

convertTogrid(){
  this.showtable=!this.showtable
  }
}
