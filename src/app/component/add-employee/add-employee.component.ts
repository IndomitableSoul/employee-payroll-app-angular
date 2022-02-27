import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  
  profilePics = ["../../assets/profile-images/Ellipse -1.png", "../../assets/profile-images/Ellipse -2.png","../../assets/profile-images/Ellipse -3.png", "../../assets/profile-images/Ellipse -4.png"];
  genders = ["Male", "Female", "Other"];
  actionBtnName = "Save";
  employeeForm !: FormGroup;

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  constructor(
    private formBuilder : FormBuilder, 
    private httpService : HttpService, 
    private dialogRef : MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA)
    public editEmpData:any
    ) { }
  
  ngOnInit(): void {
    
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', Validators.required ],
      profilePic: ['', Validators.required],
      department: ['', Validators.required],
      startDate: ['', Validators.required],
      gender: ['', Validators.required],
      salary: ['', Validators.required],
      note: ['', Validators.required]
    })
    // console.log("Hello",this.editEmpData);
    if(this.editEmpData){
      this.actionBtnName = "Update";
      this.employeeForm.controls['employeeName'].setValue(this.editEmpData.employeeName);
      this.employeeForm.controls['profilePic'].setValue(this.editEmpData.profilePic);
      this.employeeForm.controls['department'].setValue(this.editEmpData.department);
      this.employeeForm.controls['startDate'].setValue(this.editEmpData.startDate);
      this.employeeForm.controls['gender'].setValue(this.editEmpData.gender);
      this.employeeForm.controls['salary'].setValue(this.editEmpData.salary);
      this.employeeForm.controls['note'].setValue(this.editEmpData.note);
    }
  }
  
  
  addEmployeeData(){
    
    if(!this.editEmpData){
      if(this.employeeForm.valid){
        this.httpService.postEmpData(this.employeeForm.value)
        .subscribe({
          next:(res)=>{
            alert("Employee added successfully!!!");
            this.employeeForm.reset();
            this.dialogRef.close('save');
    
          },
          error:()=>{
            alert("Error occurred while adding the Employee Data!!!")
          }
        }); 
       }
    }else{
     this.updateEmployeeData();
    }
  }

  updateEmployeeData(){
    this.httpService.putEmpData(this.employeeForm.value, this.editEmpData.id)
    .subscribe( {
      next:(res)=>{
      alert("Employee with id "+ this.editEmpData.id+ " updated successfully!!!");
      this.employeeForm.reset();
      this.dialogRef.close('update');

    },
    error:()=>{
      alert("Error occurred while updating the Employee Data!!!")
    }
  })
  }

 
}
