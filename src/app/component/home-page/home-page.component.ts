import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { HttpService } from '../service/http.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  displayedColumns: string[] = ['id','employeeName', 'gender', 'profilePic', 'department', 'salary', 'startDate', 'note', 'actions'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private httpService : HttpService, public addEmployee : MatDialog) { }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  getEmployeeData(){
    return this.httpService.getEmployeeData()
    .subscribe({
     next: (res)=>{
    
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     },
     error:(err)=>console.log("Error occured while fetching the records")
    })
  }

  editEmployee(row : any){
    this.addEmployee.open(AddEmployeeComponent, {
      width: '30%', 
      data : row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getEmployeeData();
      }})
      ;
  }

  deleteEmployeeData(id: number){
    this.httpService.deleteEmpData(id)
    .subscribe({
      next:(res)=>{
        alert("Employee data deleted Successfully");
        this.getEmployeeData();
      },
      error: ()=>{
        alert("Error occured while deleting the data")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


