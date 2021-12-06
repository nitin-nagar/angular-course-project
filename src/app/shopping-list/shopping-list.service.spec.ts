import { TestBed } from '@angular/core/testing';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

describe('ShoppingListService', () => {
  let service: ShoppingListService;
  //   service = jasmine.createSpyObj('ShoppingListService', ['getIngredient']);
  //   service.getIngredient.and.returnValue([])
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingListService],
    });
    service = TestBed.inject(ShoppingListService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getIngredientsCalls', () => {
    it('should return something', () => {
      let result = service.getIngredients();
      expect(result).not.toBe(null);
    });
  });
  describe('getIngredientCalls', () => {
    beforeEach(() => {
      spyOn(service, 'getIngredient');
    });
    it('should have been called with argument as number', () => {
      service.getIngredient(1);
      expect(service.getIngredient).toHaveBeenCalledWith(1);
    });

    it('should return something', () => {
      // service.getIngredient.and.returnValue([])
      expect(service.getIngredient(1)).not.toBe(null);
    });
  });
  describe('addIngredientsCalls', () => {
    beforeEach(() => {
      spyOn(service, 'addIngredient');
    });
    // it('should push an element in ingredients array', () => {
    //   spyOn(service.ingredientsChange, 'subscribe');
    //   let ing = new Ingredient('abc', 1);
    //   let newIng = [];
    //   let prevLen = service.getIngredients().length;
    //   service.addIngredient(ing);
    //   service.ingredientsChange.subscribe((ingr) => {
    //     console.log(ingr);
    //     newIng = ingr;
    //   });
    //   console.log(newIng);

    //   expect(service.getIngredients().length).toBe(prevLen);
    // });
  });
});
