import { TestBed } from '@angular/core/testing';

import { AuthorGuardGuard } from './author-guard.guard';

describe('AuthorGuardGuard', () => {
  let guard: AuthorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
