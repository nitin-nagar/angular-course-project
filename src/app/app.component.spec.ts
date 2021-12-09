import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let authServiceMock: any;
  let http: any;
  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['autoLogin']);
    // dataStorageServiceMock = jasmine.createSpyObj('DataStorageService');

    authServiceMock.autoLogin.and.returnValue();

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        // { provide: DataStorageService, useValue: dataStorageServiceMock },
      ],
    }).compileComponents();
    http = TestBed.inject(HttpClientTestingModule);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
