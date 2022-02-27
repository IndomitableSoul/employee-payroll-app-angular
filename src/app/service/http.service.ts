import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  //post call
  postEmpData(data:any){
    return this.http.post<any>('http://localhost:3000/employeeList/', data);
  }

  //get call
  getEmployeeData(){
    return this.http.get<any>('http://localhost:3000/employeeList/');
  }

  //put call
  putEmpData(data: any, id: number){
    return this.http.put<any>('http://localhost:3000/employeeList/'+id, data)
  }

  //delete call
  deleteEmpData(id: number){
    return this.http.delete<any>('http://localhost:3000/employeeList/'+id)
  }
}
