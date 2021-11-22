import { Injectable } from '@angular/core';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();
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
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
