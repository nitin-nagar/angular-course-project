import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes:Recipe[] = [
    new Recipe("Butter Chicken",`Simple Butter chicken recipe`,`https://www.indianhealthyrecipes.com/wp-content/uploads/2014/09/butter-chicken-500x500.jpg`)
    ,new Recipe("Shahi Paneer",`Simple Shahi Paneer`,`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_LaRfeM-EkUbJ8MXtHafkxpluBjDXpTSHYg&usqp=CAU`)
  ]
  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
