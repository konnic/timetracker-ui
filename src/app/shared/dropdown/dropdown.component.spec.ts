import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import {DebugElement} from '@angular/core';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  const initialSelectionInput = 'item3';
  const dropdownDataInput = ['item1', 'item2', 'item3'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.dropdownData = dropdownDataInput;
    component.initialSelection = initialSelectionInput;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the initial selection', () => {
    const selection: HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('button span');
    expect(selection.textContent).toEqual(initialSelectionInput);
  });

  it('should show the available options', () => {
    const options: HTMLOptionElement = fixture.debugElement.nativeElement.querySelectorAll('div option');
    expect(options[0].value).toEqual('item1');
    expect(options[1].value).toEqual('item2');
    expect(options[2].value).toEqual('item3');
  });

  it('should show selected day option', () => {
    const selection: HTMLSpanElement = fixture.debugElement.nativeElement.querySelector('button span');
    component.onOptionSelect('item2');
    fixture.detectChanges();
    expect(selection.textContent).toEqual('item2');
  });

  it('should emit item2 when corresponding option item is clicked', () => {
    let selectedOption: string;

    // get option DebugElement to trigger (click) event binding
    const secondOptionElement: DebugElement = fixture.debugElement.children[1].children[1];

    // subscribe to hear @Output event emitter
    component.selectedOption.subscribe((selection: string) => selectedOption = selection);

    // trigger click event binding on option element
    secondOptionElement.triggerEventHandler('click', 'item2');
    expect(selectedOption).toBe('item2');
  });
});

