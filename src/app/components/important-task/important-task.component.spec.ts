import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantTaskComponent } from './important-task.component';

describe('ImportantTaskComponent', () => {
  let component: ImportantTaskComponent;
  let fixture: ComponentFixture<ImportantTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
