import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {Employee, EmployeeService} from '../services/employee.service';
import {EmployeeCardComponent} from '../employee-card/employee-card.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeCardComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService,  private router: Router) {
    this.employees$ = this.employeeService.getEmployees();
  }

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['/employees/add']);
  }

  onEdit(employeeId: string) {
    this.router.navigate([`/employees/edit/${employeeId}`]);
  }
  onDelete(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId)
      .subscribe();
  }
}
