import { EventEmitter, Injectable } from '@angular/core';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Butter Chicken',
      `Simple Butter chicken recipe`,
      `https://www.indianhealthyrecipes.com/wp-content/uploads/2014/09/butter-chicken-500x500.jpg`,
      [new Ingredient('Chicken', 1), new Ingredient('Butter', 2)]
    ),
    new Recipe(
      'Shahi Paneer',
      `Simple Shahi Paneer`,
      `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LaRfeM-EkUbJ8MXtHafkxpluBjDXpTSHYg&usqp=CAU`,
      [new Ingredient('Paneer', 2), new Ingredient('Tomato', 3)]
    ),
  ];
  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    // Return the new array of recipe like a copy
    return this.recipes.slice();
  }
  getRecipe(idx: number) {
    return this.recipes.slice()[idx];
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
