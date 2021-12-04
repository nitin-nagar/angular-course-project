import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';
import { ShoppingEditComponent } from './shopping-edit.component';

describe('ShoppingEditComponent', () => {
  let fixture: ComponentFixture<ShoppingEditComponent>;
  let comp: ShoppingEditComponent;
  let shoppingListServiceMock: any;
  beforeEach(async () => {
    shoppingListServiceMock = jasmine.createSpyObj('ShoppingListService', [
      'getIngredient',
      'addIngredient',
      'updateIngredient',
    ]);
    shoppingListServiceMock.getIngredient.and.returnValue([]);
    shoppingListServiceMock.addIngredient.and.returnValue(null);
    shoppingListServiceMock.updateIngredient.and.returnValue(null);
    shoppingListServiceMock.startedEditing = new Subject<number>();

    await TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      imports: [FormsModule],
      providers: [
        { provide: ShoppingListService, useValue: shoppingListServiceMock },
      ],
    }).compileComponents();
    shoppingListServiceMock = TestBed.inject(ShoppingListService);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingEditComponent);
    comp = fixture.componentInstance;
  });
  it('should create shopping-edit component', async () => {
    fixture.detectChanges();
    expect(comp).toBeTruthy();
  });
  describe('HTML Template', () => {
    let elements: DebugElement;
    let formElement: HTMLElement;
    beforeEach(() => {
      elements = fixture.debugElement;
      formElement = elements.query(By.css('form')).nativeElement;
    });
    it('should create a declare a form', () => {
      expect(formElement).not.toBe(null);
    });
    it('should have two input fields', () => {
      const inputElements = formElement.querySelectorAll('input');
      expect(inputElements.length).toBe(2);
    });
    it('should have two buttons', () => {
      const buttonEle = formElement.querySelectorAll('button');
      expect(buttonEle.length).toBe(2);
    });
    it('the inputs should be empty when rendered', () => {
      fixture.detectChanges();
      const editFormGroup = comp.form;
      const fromValues = {};
      expect(editFormGroup.value).toEqual(fromValues);
    });
    it('should set form values by calling setValues when value recieve from outside', () => {
      fixture.detectChanges();
      const editFormGroup = comp.form;
      setTimeout(() => {
        editFormGroup.setValue({
          name: 'abc',
          amount: 1,
        });
      });
      const inputElements = formElement.querySelectorAll('input');
      expect(inputElements[0].value).not.toBe(null);
      expect(inputElements[1].value).not.toBe(null);
    });
  });
});
