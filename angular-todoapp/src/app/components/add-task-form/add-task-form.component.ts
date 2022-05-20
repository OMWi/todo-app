import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/data-models/task';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {
  priorityIcon = faFlag;
  addTaskForm: FormGroup = this.formBuilder.group({
    name: "",
    description: "",
    priority: "1"
  });

  @Input() sectionId: number = -1;

  @Output() submitEvent: EventEmitter<Task> = new EventEmitter();
  @Output() closeEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let title = this.addTaskForm.get("name")!.value;
    let description = this.addTaskForm.get("description")!.value;
    let priority = this.addTaskForm.get("priority")!.value;
    if (this.sectionId != -1) {
      let newTask = new Task(title, description, priority, this.sectionId);
      this.submitEvent.emit(newTask);
    }
    this.closeEvent.emit();
  }

  onClose(): void {
    this.closeEvent.emit();    
  }

}
