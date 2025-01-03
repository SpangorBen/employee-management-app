import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, throwError} from 'rxjs';


export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  hireDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeListSubject = new BehaviorSubject<Employee[]>(this.getEmployeesFromLocalStorage());
  public employeeList$ = this.employeeListSubject.asObservable();
  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return this.employeeList$.pipe(
      catchError((error) => {
        console.error('Error getting employees', error);
        return throwError(()=> error);
      })
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const employees = this.getEmployeesFromLocalStorage();
    const newEmployees = [...employees, employee];
    this.saveEmployeesToLocalStorage(newEmployees);
    this.employeeListSubject.next(newEmployees);
    return of(employee).pipe(
      catchError((error) => {
        console.error('Error adding employees', error);
        return throwError(() => error);
      })
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const employees = this.getEmployeesFromLocalStorage();
    const updatedEmployees = employees.map(e => e.id === employee.id ? employee : e);
    this.saveEmployeesToLocalStorage(updatedEmployees);
    this.employeeListSubject.next(updatedEmployees);
    return of(employee).pipe(
      catchError((error) => {
        console.error('Error updating employees', error);
        return throwError(() => error);
      })
    );
  }

  deleteEmployee(id: string): Observable<string> {
    const employees = this.getEmployeesFromLocalStorage();
    const newEmployees = employees.filter(e => e.id !== id);
    this.saveEmployeesToLocalStorage(newEmployees);
    this.employeeListSubject.next(newEmployees);
    return of(id).pipe(
      catchError((error) => {
        console.error('Error deleting employees', error);
        return throwError(() => error);
      })
    );
  }

  getEmployee(id: string): Observable<Employee | undefined> {
    return this.employeeList$.pipe(
      map((employees) => employees.find((employee) => employee.id === id)),
      catchError((error) => {
        console.error('Error getting employees by id', error);
        return throwError(()=> error);
      })
    );
  }

  private saveEmployeesToLocalStorage(newEmployees: Employee[]) {
    try {
      localStorage.setItem('employees', JSON.stringify(newEmployees));
    } catch (error) {
      console.error('Error saving employees to local storage', error);
    }
  }

  private getEmployeesFromLocalStorage(): Employee[] {
    try {
      const storedEmployees = localStorage.getItem('employees');
      if (storedEmployees) {
        return JSON.parse(storedEmployees);
      }
      return [];
    } catch (error) {
      console.error('Error loading employees from local storage', error);
      return [];
    }
  }

}
