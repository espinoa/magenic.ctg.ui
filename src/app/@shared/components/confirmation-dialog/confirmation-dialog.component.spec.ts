import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core/src/debug/debug_node';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';


describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  let titleEl: DebugElement;
  let messageEl: DebugElement;
  let checkboxMessageEl: DebugElement;
  let btnCancelEl: DebugElement;
  let btnConfirmationEl: DebugElement;

  let data = {
    title: 'WARNING!',
    message: 'test message',
    checkboxMessage: 'Yes, I am abosulutely sure!',
    btnCancel: 'Cancel',
    btnConfirmation: 'Confirm'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { data } },
        { provide: MatDialogRef, useValue: { ConfirmationDialogComponent } }
    ]
    })

    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;

    titleEl = fixture.debugElement.query(By.css('.header-text'));
    messageEl = fixture.debugElement.query(By.css('.dialog-message'));
    checkboxMessageEl = fixture.debugElement.query(By.css('.form-check-label'));
    btnCancelEl = fixture.debugElement.query(By.css('.btn-ctg-gray'));
    btnConfirmationEl = fixture.debugElement.query(By.css('.btn-ctg-default'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dialog title', () => {
    expect(titleEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display dialog title', () => {
    component.title = data.title;
    fixture.detectChanges();
    expect(titleEl.nativeElement.innerText).toEqual(data.title);
  });

  it('should render dialog message', () => {
    expect(messageEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display dialog message', () => {
    component.message = data.message;
    fixture.detectChanges();
    expect(messageEl.nativeElement.innerText).toEqual(data.message);
  });

  it('should render dialog checkbox message', () => {
    expect(checkboxMessageEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display dialog checkbox message', () => {
    component.checkboxMessage = data.checkboxMessage;
    fixture.detectChanges();
    expect(checkboxMessageEl.nativeElement.innerText).toEqual(data.checkboxMessage);
  });

  it('should render dialog button cancel', () => {
    expect(btnCancelEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display dialog button cancel', () => {
    component.btnCancel = data.btnCancel;
    fixture.detectChanges();
    expect(btnCancelEl.nativeElement.innerText).toEqual(data.btnCancel);
  });

  it('should render dialog button confirmation', () => {
    expect(btnConfirmationEl.nativeElement.hidden).toBeFalsy();
  });

  it('should display dialog button confirmation', () => {
    component.btnConfirmation = data.btnConfirmation;
    fixture.detectChanges();
    expect(btnConfirmationEl.nativeElement.innerText).toEqual(data.btnConfirmation);
  });
});
