import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PickerComponent } from './picker.component';
import { of } from 'rxjs';
import { PickerSupportService } from './picker-support.service';

describe('PickerComponent', () => {
  let component: PickerComponent;
  let fixture: ComponentFixture<PickerComponent>;

  const mockedPickerSupportService = {
    hidePicker() {
      return of();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerComponent ],
      providers: [
        { PickerSupportService, useValue: mockedPickerSupportService }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
