import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Employee} from '../services/employee.service';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {
  @Input() employee?: Employee;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }

  onDelete(){
    this.delete.emit()
  }
}
