import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { HomePageComponent } from '../home-page/home-page.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  
  constructor(public addEmployee: MatDialog, private homePage : HomePageComponent) {}
  
  openDialog() {
    this.addEmployee.open(AddEmployeeComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val == 'save')
      this.homePage.getEmployeeData();
    });
  }
  ngOnInit(): void {
  }

}
