import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Dropdown } from './dropdown.directive';
@Component({
  template: `
    <ul class="nav navbar-nav navbar-right">
      <li>
        <a style="cursor: pointer">Logout</a>
      </li>
      <li class="dropdown" appDropdown>
        <a style="cursor: pointer" class="dropdown-toggle" role="button"
          >Manage <span class="caret"></span
        ></a>
        <ul class="dropdown-menu">
          <li>
            <a style="cursor: pointer">Save Data</a>
          </li>
          <li>
            <a style="cursor: pointer">Fetch Data</a>
          </li>
        </ul>
      </li>
    </ul>
  `,
})
class TestComponent {}
describe('DropDownDirective', () => {
  let fixture;
  let des: DebugElement[];
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, Dropdown],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(TestComponent);
    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.directive(Dropdown));
  });
  it('should have a li element with app dropdown', () => {
    expect(des.length).toBe(1);
  });
  it('should have a class names dropdown', () => {
    const li = des[0].nativeElement as HTMLElement;
    // console.log(cl.className);
    expect(li.className).toBe('dropdown');
  });
  it('should open dropdown on click event', () => {
    const li = des[0].nativeElement as HTMLElement;
    expect(li.className).toBe('dropdown');
    li.click();
    fixture.detectChanges();
    expect(li.className).toBe('dropdown open');
  });
  it('should close dropdown oafter click anywhere', () => {
    const li = des[0].nativeElement as HTMLElement;
    li.click();
    fixture.detectChanges();
    expect(li.className).toBe('dropdown open');
    li.click();
    fixture.detectChanges();
    expect(li.className).toBe('dropdown');
  });
});
