import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MemberService } from '../../services/member.service';
import { Task } from '../../models/Task';
import { element } from 'protractor';
import { isPlatformWorkerApp } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentImportant: any;
  searchTerm: String;
  currentDaily: any;
  currentPlan: any;
  assignTab: any;
  important: any;
  category: any;
  sort: boolean;
  members: any;
  filter: any;
  daily: any;
  today: any;
  teams: any;
  time: any;
  plan: any;
  tab: any;

  memberStat: any;
  teamStat: any;

  constructor(
    private taskService: TaskService,
    private membersService: MemberService
  ) {}

  ngOnInit(): void {
    this.sort = false;

    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.searchTerm = '';

    this.filter = {
      important: false,
      repeat: false,
      complete: false,
      dueDate: false,
    };

    this.category = {
      primary: false,
      secondary: false,
      danger: false,
      success: false,
      warning: false,
      information: false,
    };

    this.tab = {
      daily: true,
      important: false,
      planned: false,
      assign: false,
    };

    this.assignTab = {
      members: true,
      teams: false,
      stats: false,
    };

    this.taskService.getDaily().subscribe((tasks) => (this.daily = tasks));
    this.currentDaily = [...this.daily];

    this.taskService
      .getImportant()
      .subscribe((tasks) => (this.important = tasks));
    this.currentImportant = [...this.important];

    this.taskService.getPlan().subscribe((tasks) => (this.plan = tasks));
    this.currentPlan = [...this.plan];

    this.currentPlan = this.currentPlan.map((item) => {
      let holder = { ...item };
      holder.date = new Date(holder.date);
      return holder;
    });

    this.membersService
      .getMembers()
      .subscribe((members) => (this.members = members));
    this.membersService.getTeam().subscribe((teams) => (this.teams = teams));

    /** Stat for members */
    this.memberStat = [];
    let totalTask = this.members.map((item) => item.tasks.length);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalTask = totalTask.reduce(reducer);

    this.members.forEach((element) => {
      let memberStatItem = { ...element };
      let percentage = Math.round(
        (memberStatItem.tasks.length / totalTask) * 100
      );
      if (percentage == 0) {
        memberStatItem.class = `percentage percentage-1`;
        memberStatItem.ystick = `${memberStatItem.name} (0 %)`;
      } else {
        memberStatItem.class = `percentage percentage-${percentage}`;
        memberStatItem.ystick = `${memberStatItem.name} (${percentage} %)`;
      }

      this.memberStat.push(memberStatItem);
    });

    /** Stat for Team */
    this.teamStat = [];
    totalTask = this.teams.map((item) => item.tasks.length);
    totalTask = totalTask.reduce(reducer);

    this.teams.forEach((element) => {
      let teamStatItem = { ...element };
      let percentage = Math.round(
        (teamStatItem.tasks.length / totalTask) * 100
      );
      if (percentage == 0) {
        teamStatItem.class = `percentage percentage-1`;
        teamStatItem.ystick = `${teamStatItem.name} (0 %)`;
      } else {
        teamStatItem.class = `percentage percentage-${percentage}`;
        teamStatItem.ystick = `${teamStatItem.name} (${percentage} %)`;
      }

      this.teamStat.push(teamStatItem);
    });
  }

  toogleTab(event, type): void {
    event.preventDefault();
    switch (type) {
      case 'daily':
        this.tab = {
          daily: true,
          important: false,
          planned: false,
          assign: false,
        };
        break;
      case 'important':
        this.tab = {
          daily: false,
          important: true,
          planned: false,
          assign: false,
        };
        break;
      case 'planned':
        this.tab = {
          daily: false,
          important: false,
          planned: true,
          assign: false,
        };
        break;
      case 'assign':
        this.tab = {
          daily: false,
          important: false,
          planned: false,
          assign: true,
        };
        break;
    }
  }

  toogleAssignTab(event, type): void {
    event.preventDefault();

    switch (type) {
      case 'members':
        this.assignTab = {
          members: true,
          teams: false,
          stats: false,
        };
        break;
      case 'teams':
        this.assignTab = {
          members: false,
          teams: true,
          stats: false,
        };
        break;
      case 'stats':
        this.assignTab = {
          members: false,
          teams: false,
          stats: true,
        };
        break;
    }
  }

  toogleFilter(event, type): void {
    event.preventDefault();

    const { important, repeat, complete, dueDate } = this.filter;

    switch (type) {
      case 'important':
        this.filter = {
          important: !important,
          repeat,
          complete,
          dueDate,
        };
        break;
      case 'repeat':
        this.filter = {
          important,
          repeat: !repeat,
          complete,
          dueDate,
        };
        break;
      case 'complete':
        this.filter = {
          important,
          repeat,
          complete: !complete,
          dueDate,
        };
        break;
      case 'dueDate':
        this.filter = {
          important,
          repeat,
          complete,
          dueDate: !dueDate,
        };
        break;
    }

    this.filterTask();
  }

  toogleCategory(event, type): void {
    event.preventDefault();
    const {
      primary,
      secondary,
      danger,
      success,
      warning,
      information,
    } = this.category;

    switch (type) {
      case 'primary':
        this.category = {
          primary: !primary,
          secondary,
          danger,
          success,
          warning,
          information,
        };
        break;
      case 'secondary':
        this.category = {
          primary,
          secondary: !secondary,
          danger,
          success,
          warning,
          information,
        };
        break;
      case 'danger':
        this.category = {
          primary,
          secondary,
          danger: !danger,
          success,
          warning,
          information,
        };
        break;
      case 'success':
        this.category = {
          primary,
          secondary,
          danger,
          success: !success,
          warning,
          information,
        };
        break;
      case 'warning':
        this.category = {
          primary,
          secondary,
          danger,
          success,
          warning: !warning,
          information,
        };
        break;
      case 'information':
        this.category = {
          primary,
          secondary,
          danger,
          success,
          warning,
          information: !information,
        };
        break;
    }

    this.filterCategory();
  }

  toogleSort(event): void {
    this.sort = !this.sort;

    if (this.sort) {
      this.currentPlan = this.currentPlan.sort(function (a, b) {
        return a.date.getTime() - b.date.getTime();
      });
    } else {
      this.currentPlan = this.currentPlan.sort(function (a, b) {
        return b.date.getTime() - a.date.getTime();
      });
    }
  }

  filterTask(): void {
    const { important, repeat, complete, dueDate } = this.filter;

    if (important) {
      this.currentDaily = this.currentDaily.filter(
        (item) => item.important == important
      );
      this.currentImportant = this.currentImportant.filter(
        (item) => item.important == important
      );
    }

    if (repeat) {
      this.currentDaily = this.currentDaily.filter(
        (item) => item.repeat == repeat
      );

      this.currentImportant = this.currentImportant.filter(
        (item) => item.repeat == repeat
      );
    }

    if (complete) {
      this.currentDaily = this.currentDaily.filter(
        (item) => item.complete == complete
      );

      this.currentImportant = this.currentImportant.filter(
        (item) => item.complete == complete
      );
    }

    if (dueDate) {
      this.currentDaily = this.currentDaily.filter(
        (item) => item.dueDate !== null
      );

      this.currentImportant = this.currentImportant.filter(
        (item) => item.dueDate !== null
      );
    }
  }

  filterCategory(): void {
    if (this.category.primary) {
      this.currentDaily = this.currentDaily.filter((item) =>
        item.category.includes('primary')
      );

      this.currentImportant = this.currentImportant.filter((item) =>
        item.category.includes('primary')
      );
    }

    if (this.category.secondary) {
      this.currentDaily = this.currentDaily.filter((item) =>
        item.category.includes('secondary')
      );

      this.currentImportant = this.currentImportant.filter((item) =>
        item.category.includes('secondary')
      );
    }

    if (this.category.danger) {
      this.currentDaily = this.currentDaily.filter((item) =>
        item.category.includes('danger')
      );

      this.currentImportant = this.currentImportant.filter((item) =>
        item.category.includes('danger')
      );
    }

    if (this.category.success) {
      this.currentDaily = this.currentDaily.filter((item) =>
        item.category.includes('success')
      );

      this.currentImportant = this.currentImportant.filter((item) =>
        item.category.includes('success')
      );
    }

    if (this.category.warning) {
      this.currentDaily = this.currentDaily.filter((item) =>
        item.category.includes('warning')
      );

      this.currentImportant = this.currentImportant.filter((item) =>
        item.category.includes('warning')
      );
    }

    if (this.category.information) {
      this.currentDaily = this.currentDaily.filter((item) =>
        item.category.includes('information')
      );

      this.currentImportant = this.currentImportant.filter((item) =>
        item.category.includes('information')
      );
    }
  }

  filterSearch(): void {
    let re = new RegExp(String(this.searchTerm), 'i');
    this.currentDaily = this.daily.filter((item) => re.test(item.content));

    this.currentImportant = this.important.filter((item) =>
      re.test(item.content)
    );

    this.currentPlan = this.plan.filter((item) => re.test(item.content));
  }

  clearFilter(event): void {
    event.preventDefault();
    this.currentDaily = this.daily;
    this.currentImportant = this.important;
    this.filter = {
      important: false,
      repeat: false,
      complete: false,
      dueDate: false,
    };
    this.clearCategory();
  }

  clearCategory(): void {
    event.preventDefault();
    this.category = {
      primary: false,
      secondary: false,
      danger: false,
      success: false,
      warning: false,
      information: false,
    };
  }

  select(item: Task): void {}

  deleteTask(item: Task, type: String): void {
    if (type == 'daily') {
      this.taskService.deleteDaily(item);
      this.taskService.getDaily().subscribe((tasks) => (this.daily = tasks));
      this.currentDaily = [...this.daily];
    }

    if (type == 'important') {
      this.taskService.deleteImportant(item);
      this.taskService
        .getImportant()
        .subscribe((tasks) => (this.important = tasks));
      this.currentImportant = [...this.important];
    }

    if (type == 'planned') {
      this.taskService.deletePlan(item);
      this.taskService.getPlan().subscribe((tasks) => (this.plan = tasks));
      this.currentPlan = [...this.plan];
    }
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
}
