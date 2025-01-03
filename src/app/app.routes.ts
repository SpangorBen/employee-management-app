import { Routes } from '@angular/router';
import {EmployeeListComponent} from './employee/employee-list/employee-list.component';
import {EmployeeFormComponent} from './employee/employee-form/employee-form.component';

export const routes: Routes = [
  {
    path: 'employees',
    // loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
    component: EmployeeListComponent,
  },
  {
    path: 'employees/add',
    component: EmployeeFormComponent
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeFormComponent
  },
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  // {path: 'employees', component: EmployeeListComponent},
];
