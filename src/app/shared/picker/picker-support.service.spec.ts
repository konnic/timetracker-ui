import { TestBed } from '@angular/core/testing';

import { PickerSupportService } from './picker-support.service';

describe('PickerSupportService', () => {
  let service: PickerSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickerSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
