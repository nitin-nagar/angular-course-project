import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
describe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let comp: AuthComponent;
  let authServiceMock: any;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['autoLogin']);
    authServiceMock.autoLogin.and.returnValue();
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AuthComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    comp = fixture.componentInstance;
  });

  it('should create the auth comp', () => {
    expect(comp).toBeTruthy();
  });
});
