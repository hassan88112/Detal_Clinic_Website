import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  constructor(private http:HttpClient) { }

  getAllPatient(){
    return  this.http.get('http://localhost:8080/api/v1/AllPatients');
  }
  /*
  addPatient(){
    return this.http.post('http://localhost:8080/api/v1/addPatient',this.f.value);
  }*/
}
