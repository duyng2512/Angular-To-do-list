import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-important-task',
  templateUrl: './important-task.component.html',
  styleUrls: ['./important-task.component.css'],
})
export class ImportantTaskComponent implements OnInit {
  text: String;
  time: any;
  task: Task;
  tasks: Task[];
  taskInput: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.time = Date.now();
    this.taskService.getImportant().subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.task = this.tasks[0];

    this.taskInput = {
      id: null,
      content: '',
      step: [],
      remind: false,
      dueDate: null,
      category: [],
      note: '',
      complete: false,
      repeat: false,
      important: false,
    };
  }

  addTask(e): void {
    let newTask = { ...this.taskInput };
    newTask.id = `ID${uuidv4()}`;
    newTask.step = [];
    newTask.remind = false;
    newTask.dueDate = null;
    newTask.category = [];
    newTask.note = '';

    this.task = newTask;
    this.tasks.unshift(newTask);
    this.taskService.addImportant(this.tasks);

    // Clear Input
    this.taskInput = {
      id: null,
      content: '',
      step: [],
      remind: false,
      dueDate: Date.now(),
      category: [],
      note: '',
      complete: false,
      repeat: false,
      important: false,
    };
  }

  updateTask(event): void {
    event.preventDefault();
    this.taskService.updateImportant(this.task);
    this.taskService.getImportant().subscribe((tasks) => (this.tasks = tasks));
  }

  select(item: Task): void {
    this.task = { ...item };
  }

  markComplete(event): void {
    event.preventDefault();
    this.task.complete = !this.task.complete;
  }

  markImportant(event): void {
    event.preventDefault();
    this.task.important = !this.task.important;
  }

  markRepeat(event): void {
    event.preventDefault();
    this.task.repeat = !this.task.repeat;
  }

  addStep(event): void {
    event.preventDefault();
    this.task.step.push(this.text);
    this.text = '';
  }

  pickCategory(event, type): void {
    event.preventDefault();
    let newCategory = [...this.task.category];
    newCategory.push(type);
    newCategory = [...new Set(newCategory)];
    this.task.category = [...newCategory];
  }

  getCategory(type): String {
    switch (type) {
      case 'primary':
        return "<span class='text-primary mr-1'><i class='fas fa-tasks'></i> Primary </span>";
      case 'secondary':
        return "<span class='text-secondary mr-1'><i class='fas fa-magnet'></i> Secondary </span>";
      case 'danger':
        return "<span class='text-danger mr-1'><i class='fas fa-exclamation-circle'></i> Danger </span>";
      case 'success':
        return "<span class='text-success mr-1'><i class='fas fa-check-circle'></i> Success </span>";
      case 'warning':
        return "<span class='text-warning mr-1'><i class='fas fa-exclamation-triangle'></i> Warning </span>";
      case 'information':
        return "<span class='text-info mr-1'><i class='fa fa-info'></i> Information </span>";
    }
  }

  deleteTask(item: Task) {
    this.taskService.deleteImportant(item);
    this.taskService.getImportant().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteAllTask(event) {
    event.preventDefault();
    this.taskService.deleteAllImportant();
    this.taskService.getImportant().subscribe((tasks) => (this.tasks = tasks));
  }
}
