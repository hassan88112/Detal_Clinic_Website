import {HttpClient} from "@angular/common/http";


export class Patients {

  constructor() {
  }
  public id:number ;
  public firstName:string;
  public  lastName :string;
  public  email :string;
  public  date :Date;
  public  price :number;


}

import {Component, OnInit} from '@angular/core';
import {PatientServiceService} from "../../services/patient-service.service";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{

  patients :Patients [] =[];
  closeResult :string

  constructor(
    private http :HttpClient,
    private service :PatientServiceService ,
    private modalService: NgbModal

  ) {

  }
  ngOnInit(): void {
    this.getPatients();
  }
  getPatients(){
    this.service.getAllPatient().subscribe((response :any) =>
       {
        this.patients=response;
      }
    );

  }

  /*
  if we did not need the service we create one method in ts
  patients :Patients [];
  getPatients(){
    this.http.get<any>('http://localhost:8080/api/v1/AllPatients').subscribe(
      response => {
        this.patients=response;
      }
    )
  }*/


  open(content :any) {
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
      return `with: ${reason}`;
    }
  }

  onSubmit(f : NgForm) {
    const url = 'http://localhost:8080/api/v1/AddPatient';
    this.http.post(url, f.value)
      .subscribe(result => {
        this.ngOnInit();                             //  reload the table
      });
    this.modalService.dismissAll();                  //  dismiss the modal
  }
}




