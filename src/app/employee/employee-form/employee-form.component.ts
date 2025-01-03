import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService, Employee } from '../services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{
  employeeForm!: FormGroup;
  employeeId: string | null = null;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      hireDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.employeeService.getEmployee(this.employeeId)
        .subscribe((employee)=> {
          if(employee){
            this.employeeForm.patchValue(employee)
          }else{
            this.router.navigate(['/employees']);
          }
        });
    }
  }


  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: Employee = {id: this.employeeId || crypto.randomUUID(), ...this.employeeForm.value};
      let employeeObservable: Observable<Employee>

      if (this.employeeId) {
        employeeObservable = this.employeeService.updateEmployee(employee)
      } else {
        employeeObservable = this.employeeService.addEmployee(employee)
      }

      employeeObservable.subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
