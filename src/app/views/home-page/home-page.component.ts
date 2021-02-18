import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }]
})
export class HomePageComponent implements OnInit,AfterViewInit {
  numbreOfsubjects = 32
  numberOfApplications = 212
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.facebook()
    this.twitter()
    this.instagram()
  }
  facebook(){
    let icone = document.getElementsByClassName('fa-facebook')
    console.log(icone[0])
    icone[0].addEventListener('click',() =>{
      console.log(icone[0])
      window.location.href = "https://fr-fr.facebook.com/talan/"
    })
  }
  twitter(){
    let icone = document.getElementsByClassName('fa-twitter')
    console.log(icone[0])
    icone[0].addEventListener('click',() =>{
      console.log(icone[0])
      window.location.href = "https://twitter.com/talan_fr"
    })
  }
  instagram(){
    let icone = document.getElementsByClassName('fa-instagram')
    console.log(icone[0])
    icone[0].addEventListener('click',() =>{
      console.log(icone[0])
      window.location.href = "https://www.instagram.com/talan.group/"
    })
  }
         ngAfterViewInit(){
         this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
      }
}
