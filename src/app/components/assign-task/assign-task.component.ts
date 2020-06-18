import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/Team';
import { Member } from '../../models/Member';
import { MemberService } from '../../services/member.service';
import { Task } from 'src/app/models/Task';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css'],
})
export class AssignTaskComponent implements OnInit {
  members: Member[];
  team: Team[];
  memberInput: Member;
  teamInput: Team;
  currentMember: Member[];
  currentMemberIdx: number;
  minMemberIdx: boolean;
  maxMemberIdx: boolean;
  currentTeam: Team[];
  currentTeamIdx: number;
  minTeamIdx: boolean;
  maxTeamIdx: boolean;
  taskInput: Task;

  pageMemberMax: number;
  pageTeamMax: number;
  totalTask: any;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.totalTask = 0;
    this.currentMember = [];
    this.currentMemberIdx = 0;
    this.minMemberIdx = true;
    this.maxMemberIdx = false;

    this.currentTeam = [];
    this.currentTeamIdx = 0;
    this.minTeamIdx = true;
    this.maxTeamIdx = false;

    this.teamInput = {
      id: null,
      name: '',
      users: [],
      tasks: [],
    };
    this.memberInput = {
      id: null,
      name: '',
      job: '',
      tasks: [],
      avatar: null,
    };
    this.taskInput = {
      id: null,
      content: '',
    };

    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members));

    this.memberService.getTeam().subscribe((team) => (this.team = team));

    if (this.members.length <= 4) {
      this.currentMember = this.members.slice(
        this.currentMemberIdx,
        this.members.length
      );
    } else {
      this.currentMember = this.members.slice(
        this.currentMemberIdx,
        this.currentMemberIdx + 4
      );
    }

    if (this.team.length <= 4) {
      this.currentTeam = this.team.slice(this.currentTeamIdx, this.team.length);
    } else {
      this.currentTeam = this.team.slice(
        this.currentMemberIdx,
        this.currentMemberIdx + 4
      );
    }

    this.pageMemberMax = Math.ceil(this.members.length / 4);
    this.pageTeamMax = Math.ceil(this.team.length / 4);
    this.upDateTotalTask();
  }

  updatePageMax(): void {
    this.pageMemberMax = Math.ceil(this.members.length / 4);
    this.pageTeamMax = Math.ceil(this.team.length / 4);
  }

  addUser(event): void {
    event.preventDefault();
    let newUser = { ...this.memberInput };
    newUser.id = uuidv4();
    newUser.tasks = [];
    newUser.avatar = `https://avatars.dicebear.com/api/avataaars/${newUser.id}.svg`;
    this.members.unshift(newUser);

    if (this.members.length <= 4) {
      this.currentMember = this.members.slice(
        this.currentMemberIdx,
        this.members.length
      );
    } else {
      this.currentMember = this.members.slice(
        this.currentMemberIdx,
        this.currentMemberIdx + 4
      );
    }

    this.memberService.addMembers(this.members);

    this.resetInput();
    this.updatePageMax();
  }

  nextPage(e, type): void {
    if (type === 'members') {
      this.currentMemberIdx += 1;
      this.currentMember = this.members.slice(
        this.currentMemberIdx * 4,
        this.currentMemberIdx * 4 + 4
      );

      if (Math.ceil(this.members.length / 4) - 1 == this.currentMemberIdx) {
        this.maxMemberIdx = true;
      } else {
        this.maxMemberIdx = false;
      }

      if (this.currentMemberIdx == 0) {
        this.minMemberIdx = true;
      } else {
        this.minMemberIdx = false;
      }
    }

    if (type === 'team') {
      this.currentTeamIdx += 1;
      this.currentTeam = this.team.slice(
        this.currentTeamIdx * 4,
        this.currentTeamIdx * 4 + 4
      );

      if (Math.ceil(this.team.length / 4) - 1 == this.currentTeamIdx) {
        this.maxTeamIdx = true;
      } else {
        this.maxTeamIdx = false;
      }

      if (this.currentTeamIdx == 0) {
        this.minTeamIdx = true;
      } else {
        this.minTeamIdx = false;
      }
    }
  }

  prevPage(e, type): void {
    if (type === 'members') {
      this.currentMemberIdx -= 1;
      this.currentMember = this.members.slice(
        this.currentMemberIdx * 4,
        this.currentMemberIdx * 4 + 4
      );

      if (Math.ceil(this.members.length / 4) - 1 == this.currentMemberIdx) {
        this.maxMemberIdx = true;
      } else {
        this.maxMemberIdx = false;
      }

      if (this.currentMemberIdx == 0) {
        this.minMemberIdx = true;
      } else {
        this.minMemberIdx = false;
      }
    }

    if (type === 'team') {
      this.currentTeamIdx -= 1;
      this.currentTeam = this.team.slice(
        this.currentTeamIdx * 4,
        this.currentTeamIdx * 4 + 4
      );

      if (Math.ceil(this.team.length / 4) - 1 == this.currentTeamIdx) {
        this.maxTeamIdx = true;
      } else {
        this.maxTeamIdx = false;
      }

      if (this.currentTeamIdx == 0) {
        this.minTeamIdx = true;
      } else {
        this.minTeamIdx = false;
      }
    }
  }

  addMemberToTeamInput(event, item: Member): void {
    event.preventDefault();
    this.teamInput.users.push(item);
  }

  clearMemberToTeamInput(event, delMember: Member): void {
    event.preventDefault();
    this.teamInput.users = this.teamInput.users.filter(
      (item) => item.id !== delMember.id
    );
  }

  createTeam(event): void {
    event.preventDefault();
    let newTeam = { ...this.teamInput };
    newTeam.id = uuidv4();
    this.team.push(newTeam);
    this.memberService.addTeam(this.team);

    if (this.team.length <= 4) {
      this.currentTeam = this.team.slice(this.currentTeamIdx, this.team.length);
    } else {
      this.currentTeam = this.team.slice(
        this.currentTeamIdx,
        this.currentTeamIdx + 4
      );
    }

    this.resetInput();
    this.updatePageMax();
  }

  selectMember(event, member: Member): void {
    event.preventDefault();
    this.memberInput = { ...member };
    console.log(this.memberInput);
  }

  selectTeam(event, team: Team): void {
    event.preventDefault();
    this.teamInput = { ...team };
  }

  asignTask(event): void {
    event.preventDefault();
    let newTask = { ...this.taskInput };
    newTask.id = uuidv4();
    this.memberInput.tasks.push(newTask);
    this.memberService.updateMembers(this.memberInput);

    /** Reset input*/
    this.resetInput();

    this.upDateTotalTask();
  }

  asignTaskTeam(event): void {
    event.preventDefault();
    let newTask = { ...this.taskInput };
    newTask.id = uuidv4();
    this.teamInput.tasks.push(newTask);
    this.memberService.updateTeam(this.teamInput);

    /** Reset input*/
    this.resetInput();
  }

  delTask(event, task: Task): void {
    event.preventDefault();
    this.memberInput.tasks = this.memberInput.tasks.filter(
      (item) => item.id !== task.id
    );
    this.upDateTotalTask();
  }

  updateTask(event): void {
    event.preventDefault();
    this.members = this.members.map((item) =>
      item.id === this.memberInput.id ? this.memberInput : item
    );
    this.memberService.addMembers(this.members);
    this.currentMember = this.members.slice(
      this.currentMemberIdx,
      this.currentMemberIdx + 4
    );

    this.resetInput();
  }

  delUser(event, delMember: Member): void {
    event.preventDefault();
    this.members = this.members.filter((item) => item.id !== delMember.id);
    this.currentMember = this.members.slice(
      this.currentMemberIdx,
      this.currentMemberIdx + 4
    );
    this.memberService.addMembers(this.members);
    this.resetInput();
    this.upDateTotalTask();
    this.updatePageMax();
  }

  delTeam(event, delTeam: Team): void {
    event.preventDefault();
    this.team = this.team.filter((item) => item.id !== delTeam.id);
    this.currentTeam = this.team.slice(
      this.currentTeamIdx,
      this.currentTeamIdx + 4
    );
    this.memberService.addTeam(this.team);
    this.resetInput();
    this.updatePageMax();
  }

  resetInput(): void {
    event.preventDefault();
    this.memberInput = {
      id: null,
      name: '',
      job: '',
      tasks: [],
      avatar: null,
    };
    this.taskInput = {
      id: null,
      content: '',
    };
    this.teamInput = {
      id: null,
      name: '',
      users: [],
      tasks: [],
    };
  }

  upDateTotalTask(): void {
    let totalTask = this.members.map((item) => item.tasks.length);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalTask = totalTask.reduce(reducer);

    this.totalTask = totalTask;
  }
}
