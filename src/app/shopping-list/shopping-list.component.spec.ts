import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListService } from './shopping-list.service';
class Helper {
  ingredients: Ingredient[] = [];
  ingredientsChange = new Subject<Ingredient[]>();
  getIngredients(amount: number): Ingredient[] {
    for (let i = 0; i < amount; i++) {
      this.ingredients.push(new Ingredient('abc' + i, i));
    }
    return this.ingredients;
  }
}
describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let shoppingListServiceMock: any;

  beforeEach(async () => {
    shoppingListServiceMock = jasmine.createSpyObj('ShoppingListService', [
      'getIngredients',
    ]);
    shoppingListServiceMock.getIngredients.and.returnValue([]);
    shoppingListServiceMock.ingredientsChange = new Subject<Ingredient[]>();
    shoppingListServiceMock.startedEditing = new Subject<number>();
    await TestBed.configureTestingModule({
      declarations: [ShoppingListComponent],
      providers: [
        { provide: ShoppingListService, useValue: shoppingListServiceMock },
      ],
    }).compileComponents();
    shoppingListServiceMock = TestBed.inject(ShoppingListService);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
  });
  it('should create shopping-list component', async () => {
    expect(component).toBeTruthy();
  });

  describe('Simple HTML', () => {
    let complied: HTMLElement;
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      complied = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });
    it('should render shopping edit component', () => {
      expect(complied.querySelector('app-shopping-edit')).not.toBe(null);
    });
    it('should have one hr after edit component', () => {
      expect(complied.querySelectorAll('hr').length).toBe(1);
    });
    it('should have one Unordered list item', () => {
      expect(complied.querySelectorAll('ul').length).toBe(1);
    });
    it('should show two list when render', () => {
      component.ingredients = helper.getIngredients(2);
      fixture.detectChanges();
      expect(complied.querySelectorAll('a').length).toBe(2);
    });
    it('should show 100 list item when I have 100 items', () => {
      component.ingredients = helper.getIngredients(100);
      fixture.detectChanges();
      expect(complied.querySelectorAll('a').length).toBe(100);
    });
    it('should show 1 product name and amount in anchor tag', () => {
      component.ingredients = helper.getIngredients(1);
      fixture.detectChanges();
      expect(complied.querySelector('a').innerText).toBe(
        `${helper.ingredients[0].name} (${helper.ingredients[0].amount})`
      );
    });
    it('should show 5 product name and amount in anchor tag', () => {
      component.ingredients = helper.getIngredients(5);
      fixture.detectChanges();
      function countText(tagName: string, text: string): number {
        const elements = fixture.debugElement.queryAll(By.css(tagName));

        return elements.filter(
          (element) => element.nativeElement.textContent == text
        ).length;
      }
      for (let i = 0; i < 5; i++) {
        const ingredient = helper.ingredients[i];
        expect(
          countText('a', `${ingredient.name} (${ingredient.amount})`)
        ).toBe(1);
      }
    });
  });

  describe('Oninit and functions', async () => {
    const helper = new Helper();
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should call getIngredients on the shoppinglistservice one time on ngOnit', () => {
      expect(shoppingListServiceMock.getIngredients).toHaveBeenCalledTimes(1);
    });
    it('should call editItem on when click on any ingredient', () => {
      component.ingredients = helper.getIngredients(1);
      fixture.detectChanges();
      const complied: HTMLButtonElement = fixture.debugElement.nativeElement;
      complied.querySelector('a').click();
      spyOn(component, 'onEditItem').and.callThrough();
      component.onEditItem(1);
      expect(component.onEditItem).toHaveBeenCalledOnceWith(1);
    });
  });
});
