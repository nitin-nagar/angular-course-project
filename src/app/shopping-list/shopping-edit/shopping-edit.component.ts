import { Component, ElementRef, OnInit, ViewChild,EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput',{static:true}) nameInput:ElementRef;
  @ViewChild('amountInput',{static:true}) amountInput:ElementRef;
  @Output() ingredientAdded = new EventEmitter<{name:string,amount:number}>();
  constructor() { }

  ngOnInit(): void {
  }
  onAddItem(){
    const inName = this.nameInput.nativeElement.value;
    const inAmount = this.amountInput.nativeElement.value;
    const newIngredient = new Ingredient(inName,inAmount)
    this.ingredientAdded.emit(newIngredient);
  }
}
