import { Injectable } from '@angular/core';
import { Member } from '../models/Member';
import { Team } from '../models/Team';
import { Plan } from '../models/Plan';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  members: Member[];
  team: Team[];

  constructor() {
    if (!localStorage.getItem('members')) {
      localStorage.setItem('members', JSON.stringify([]));
    }
    this.members = JSON.parse(localStorage.getItem('members'));

    if (!localStorage.getItem('team')) {
      localStorage.setItem('team', JSON.stringify([]));
    }
    this.team = JSON.parse(localStorage.getItem('team'));
  }

  getMembers(): Observable<Member[]> {
    return of(this.members);
  }

  addMembers(members: Member[]) {
    this.members = members;
    localStorage.setItem('members', JSON.stringify(this.members));
  }

  updateMembers(member: Member) {
    this.members = this.members.map((item) =>
      item.id === member.id ? member : item
    );
    localStorage.setItem('members', JSON.stringify(this.members));
  }

  updateTeam(team: Team) {
    this.team = this.team.map((item) => (item.id === team.id ? team : item));
    localStorage.setItem('team', JSON.stringify(this.team));
  }

  getTeam(): Observable<Team[]> {
    return of(this.team);
  }

  addTeam(team: Team[]) {
    this.team = team;
    localStorage.setItem('team', JSON.stringify(this.team));
  }
}
