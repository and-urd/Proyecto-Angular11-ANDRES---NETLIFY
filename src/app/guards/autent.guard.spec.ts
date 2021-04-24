import { TestBed } from '@angular/core/testing';

import { AutentGuard } from './autent.guard';

describe('AutentGuard', () => {
  let guard: AutentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
