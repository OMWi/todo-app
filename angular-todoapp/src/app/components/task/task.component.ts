import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/data-models/task';
import { ProjectsDataService } from 'src/app/services/projects-data.service';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task | undefined;
  deleteIcon = faTrashCan;
  editIcon = faPenToSquare;
  taskClass = {
    "task": true,
    "task-selected": false
  }

  constructor(public data: ProjectsDataService) { }

  ngOnInit(): void {
  }

  onTaskClick(task: Task) {
    if (!this.taskClass['task-selected']) {
      this.data.selectedTasks.push(task);
    }
    else {
      this.data.unselectTask(task);
    }
    this.taskClass['task-selected'] = !this.taskClass['task-selected'];
  }

  onDeleteTask() {
    if (!this.task) return;
    this.data.deleteTask(this.task);
  }

  // onEditTask() {
    
  // }

}
