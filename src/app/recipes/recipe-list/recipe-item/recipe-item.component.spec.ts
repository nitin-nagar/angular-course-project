import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../../recipe.model';
import { RecipeItemComponent } from './recipe-item.component';
describe('RecipeItemComponent', () => {
  let comp: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;
  let recipe: Recipe = {
    name: 'Nitin',
    description: 'Hello Mera naaam Nitin hai',
    imagePath: 'image',
    ingredients: [],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeItemComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemComponent);
    comp = fixture.componentInstance;
    comp.recipe = recipe;
    fixture.detectChanges();
  });
  it('should create the recipe item component', () => {
    expect(comp).toBeTruthy();
  });
  it('should create the recipe item', () => {
    expect(comp.recipe).toBeTruthy();
  });
});
