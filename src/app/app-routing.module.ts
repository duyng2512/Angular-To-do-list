import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { ImportantTaskComponent } from './components/important-task/important-task.component';
import { PlannedTaskComponent } from './components/planned-task/planned-task.component';
import { AssignTaskComponent } from './components/assign-task/assign-task.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'daily', component: DailyTaskComponent },
  { path: 'important', component: ImportantTaskComponent },
  { path: 'planned', component: PlannedTaskComponent },
  { path: 'assign', component: AssignTaskComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
