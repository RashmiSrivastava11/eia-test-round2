import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { Data } from '../data';
import { AppService } from '../app.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: Data[]=[];
  closeResult: string;
  selectedData: any;  

  constructor(private appService: AppService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getData();

    const numbers = interval(10000); 
    numbers.subscribe(x => {console.log('Next: ', x); this.getData()});
  }

  getData(): void {
  	this.appService.getData().subscribe(res => this.data = res);
  }

  open(content: any, data: any) {
    this.selectedData = data;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
