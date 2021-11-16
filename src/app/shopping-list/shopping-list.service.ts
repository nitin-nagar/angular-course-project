import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChnage = new EventEmitter<Ingredient[]>();
    private ingredients:Ingredient[] = [
        new Ingredient('Apple',5),
        new Ingredient('Orange',10),
      ];
    getIngredients(){
        return this.ingredients.slice();
    }  
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChnage.emit(this.ingredients.slice());
    }
    addIngredients(ingredients:Ingredient[]) {
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChnage.emit(this.ingredients.slice())
    }
}