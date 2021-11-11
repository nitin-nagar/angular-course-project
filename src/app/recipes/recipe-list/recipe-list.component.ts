import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe("Butter Chicken",`Simple Butter chicken recipe`,`https://www.indianhealthyrecipes.com/wp-content/uploads/2014/09/butter-chicken-500x500.jpg`)
    ,new Recipe("Butter Chicken",`Simple Butter chicken recipe`,`https://www.indianhealthyrecipes.com/wp-content/uploads/2014/09/butter-chicken-500x500.jpg`)
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
