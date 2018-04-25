import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListComponent } from './chip-component.component';

describe('ChipComponentComponent', () => {
  let component: ChipListComponent;
  let fixture: ComponentFixture<ChipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
