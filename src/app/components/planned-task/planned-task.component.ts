import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Plan } from '../../models/Plan';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-planned-task',
  templateUrl: './planned-task.component.html',
  styleUrls: ['./planned-task.component.css'],
})
export class PlannedTaskComponent implements OnInit {
  input: Plan;
  plans: Plan[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getPlan().subscribe((tasks) => {
      this.plans = tasks;
    });

    this.input = {
      id: String(uuidv4()),
      content: '',
      date: null,
      important: false,
    };
  }

  markImportant(event): void {
    event.preventDefault();
    this.input.important = !this.input.important;
  }

  addTask(event): void {
    event.preventDefault();
    this.plans.push(this.input);
    this.taskService.addPlan(this.plans);

    this.input = {
      id: String(uuidv4()),
      content: '',
      date: null,
      important: false,
    };
  }

  deleteTask(item: Plan) {
    this.taskService.deletePlan(item);
    this.taskService.getPlan().subscribe((tasks) => (this.plans = tasks));
  }
}
