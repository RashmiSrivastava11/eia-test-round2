import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Data } from '../data';
import { AppService } from '../app.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: Data[]=[];
  
  constructor(private appService: AppService, private modalService: NgbModal) { }

  ngOnInit() {
  	this.getData();
  }

  getData(): void {
  	this.appService.getData().subscribe(res => this.data = res);
  }

}
