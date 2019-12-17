import { Component, OnInit, PipeTransform } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Data } from '../data';
import { Hits } from '../hits';
import { AppService } from '../app.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: Hits[];
  closeResult: string;
  selectedData: any;  
  filter = new FormControl('');
  obsData$: Observable<Hits[]>;

  constructor(private appService: AppService, 
	      private modalService: NgbModal,
              pipe: DecimalPipe) 
  { 
      this.obsData$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
       
  }

  ngOnInit() {
    this.getData();

    const numbers = interval(10000); 
    numbers.subscribe(x => {console.log('Next: ', x); this.getData()});

  }

  getData(): void {
  	this.appService.getData().subscribe(res => {this.data = res['hits'];});
  }

  search(text: string, pipe: PipeTransform): Hits[] {
    return this.data.filter(item => {
    const term = text.toLowerCase();
    return item.title.toLowerCase().includes(term);
    });
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
