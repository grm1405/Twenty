import { TestBed } from '@angular/core/testing';
import { IntroGuard } from './intro.guard';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

describe('IntroGuard', () => {
  let guard: IntroGuard;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', ['get']);
    const routeSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        IntroGuard,
        { provide: StorageService, useValue: storageSpy },
        { provide: Router, useValue: routeSpy }
      ]
    });

    guard = TestBed.inject(IntroGuard);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debería permitir acceso si ya vio el intro', async () => {
    storageServiceSpy.get.and.resolveTo(true);
    const canActivate = await guard.canActivate();
    expect(canActivate).toBeTrue();
  });

  it('debería redirigir al intro si no lo ha visto', async () => {
    storageServiceSpy.get.and.resolveTo(false);
    const canActivate = await guard.canActivate();
    expect(canActivate).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/intro');
  });
});
