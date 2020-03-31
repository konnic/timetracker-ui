import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInputComponent } from './time-input.component';
import {DebugElement} from '@angular/core';

describe('TimeInputComponent', () => {
  let component: TimeInputComponent;
  let fixture: ComponentFixture<TimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeInputComponent);
    component = fixture.componentInstance;
    component.formCtrName = 'fcn';
    component.showSetCurrentTimeText = true;
    component.title = 'Title';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show time passed through property binding', () => {
    const inputElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('div div div input');
    expect(inputElement.value).toEqual('undefined');
    component.time = '13:45';
    fixture.detectChanges();
    expect(inputElement.value).toEqual('13:45');
  });

  it('should trigger updatedTime @Output on blur event', () => {
    let emittedValue: string;

    // get input DebugElement to trigger (blur) event binding
    const inputEl: DebugElement = fixture.debugElement.children[0].children[0].children[0].children[1];

    // subscribe to hear @Output event emitter
    component.updatedTime.subscribe((update: string) => emittedValue = update);

    // trigger blur event binding on input element
    inputEl.triggerEventHandler('blur', null);
    expect(emittedValue).toBe('fcn');
  });

  it('should trigger setCurrentTime @Output on click event', () => {
    let emittedValue: string;

    // get input DebugElement to trigger (click) event binding
    const buttonEl: DebugElement = fixture.debugElement.children[0].children[0].children[0].children[0];

    // subscribe to hear @Output event emitter
    component.setCurrentTime.subscribe((update: string) => emittedValue = update);

    // trigger click event binding on button element
    buttonEl.triggerEventHandler('click', null);
    expect(emittedValue).toBe('fcn');
  });

  it('should trigger setCurrentTime @Output on click event (alternative)', () => {
    let emittedValue: string;

    // get input HTML element to trigger (click) event binding
    const buttonEl: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('div div div button');

    // subscribe to hear @Output event emitter
    component.setCurrentTime.subscribe((update: string) => emittedValue = update);

    // trigger click event on button element
    buttonEl.click();
    expect(emittedValue).toBe('fcn');
  });

  it('should toggle the title', () => {
    const buttonEl: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('div div div button');
    expect(component.title).toEqual('Title');
    expect(buttonEl.textContent).toContain('Title');
    component.toggleTitle();
    fixture.detectChanges();
    expect(component.title).toEqual('Set current time');
    expect(buttonEl.textContent).toContain('Set current time');
  });

  it('should add a colon', () => {
    // get input DebugElement to trigger (keyup) event binding
    const inputEl: DebugElement = fixture.debugElement.children[0].children[0].children[0].children[1];
    component.time = '';
    fixture.detectChanges();

    // case 1
    inputEl.triggerEventHandler('keyup', { target: { value: '1', } });
    fixture.detectChanges();
    expect(component.time).toEqual('1');

    // case 2
    inputEl.triggerEventHandler('keyup', { target: { value: '12', } });
    fixture.detectChanges();
    expect(component.time).toEqual('12:');
  });
});
