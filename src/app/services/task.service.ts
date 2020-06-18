import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Plan } from '../models/Plan';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  daily: Task[];
  important: Task[];
  plan: Plan[];

  constructor() {
    if (!localStorage.getItem('daily')) {
      localStorage.setItem('daily', JSON.stringify([]));
    }
    this.daily = JSON.parse(localStorage.getItem('daily'));

    if (!localStorage.getItem('important')) {
      localStorage.setItem('important', JSON.stringify([]));
    }
    this.important = JSON.parse(localStorage.getItem('important'));

    if (!localStorage.getItem('plan')) {
      localStorage.setItem('plan', JSON.stringify([]));
    }
    this.plan = JSON.parse(localStorage.getItem('plan'));
  }

  // Daily
  getDaily(): Observable<Task[]> {
    this.daily = JSON.parse(localStorage.getItem('daily'));
    return of(this.daily);
  }

  addDaily(daily: Task[]) {
    localStorage.setItem('daily', JSON.stringify(daily));
  }

  updateDaily(updateTask: Task) {
    this.daily = this.daily.map((item) =>
      item.id === updateTask.id ? updateTask : item
    );
    localStorage.setItem('daily', JSON.stringify(this.daily));
  }

  deleteDaily(deleteTask: Task) {
    this.daily = this.daily.filter((item) => item.id !== deleteTask.id);
    localStorage.setItem('daily', JSON.stringify(this.daily));
  }

  deleteAllDaily() {
    this.daily = [];
    localStorage.setItem('daily', JSON.stringify(this.daily));
  }

  // Important
  getImportant(): Observable<Task[]> {
    this.daily = JSON.parse(localStorage.getItem('important'));
    return of(this.important);
  }

  addImportant(important: Task[]) {
    localStorage.setItem('important', JSON.stringify(important));
  }

  updateImportant(updateTask: Task) {
    this.important = this.important.map((item) =>
      item.id === updateTask.id ? updateTask : item
    );
    localStorage.setItem('important', JSON.stringify(this.important));
  }

  deleteImportant(deleteTask: Task) {
    this.important = this.important.filter((item) => item.id !== deleteTask.id);
    localStorage.setItem('important', JSON.stringify(this.important));
  }

  deleteAllImportant() {
    this.important = [];
    localStorage.setItem('important', JSON.stringify(this.important));
  }

  // Plan
  getPlan(): Observable<Plan[]> {
    this.daily = JSON.parse(localStorage.getItem('plan'));
    return of(this.plan);
  }

  addPlan(plan: Plan[]) {
    localStorage.setItem('plan', JSON.stringify(this.plan));
  }

  updatePlan(updateTask: Plan) {
    this.plan = this.plan.map((item) =>
      item.id === updateTask.id ? updateTask : item
    );
    localStorage.setItem('plan', JSON.stringify(this.plan));
  }

  deletePlan(deleteTask: Plan) {
    this.plan = this.plan.filter((item) => item.id !== deleteTask.id);
    localStorage.setItem('plan', JSON.stringify(this.plan));
  }

  deleteAllPlan() {
    this.plan = [];
    localStorage.setItem('plan', JSON.stringify(this.plan));
  }
}
