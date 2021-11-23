import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}
  collapsed = true;
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  onSaveData() {
    this.dataStorageService.storeRecipe();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
