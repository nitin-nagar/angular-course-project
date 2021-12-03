import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
describe('AlertComponent', () => {
  let comp: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
    }).compileComponents();
  });
  it('should create the alert component', () => {
    fixture = TestBed.createComponent(AlertComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    expect(comp).toBeTruthy();
  });
});
