import { TestBed } from '@angular/core/testing';

import { TimeConversionService } from './time-conversion.service';

describe('TimeConversionService', () => {
  let service: TimeConversionService;
  const case1 = ['18:00', '08:00', '01:00', '01:00'];
  const case2 = ['18:00', '08:15', '01:00', '01:00'];
  const case3 = ['18:00', '08:15', '01:45', '01:10'];
  const case4 = ['18:00', '19:00'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeConversionService]
    });
    service = TestBed.inject(TimeConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate total time of 8 hours', () => {
    const result = service.getTotalTime(...case1);
    expect(result).toEqual('08:00');
  });

  it('should calculate total time with negative minutes case', () => {
    const result = service.getTotalTime(...case2);
    expect(result).toEqual('07:45');
  });

  it('should calculate total time with second negative minutes case', () => {
    const result = service.getTotalTime(...case3);
    expect(result).toEqual('06:50');
  });

  it('should not return total time if value is negative', () => {
    const result = service.getTotalTime(...case4);
    expect(result).toEqual(undefined);
  });
});
