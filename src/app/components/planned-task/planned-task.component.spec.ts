import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedTaskComponent } from './planned-task.component';

describe('PlannedTaskComponent', () => {
  let component: PlannedTaskComponent;
  let fixture: ComponentFixture<PlannedTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
