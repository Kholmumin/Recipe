import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') addForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editingItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe((index) => {
      this.editMode = true;
      this.editingItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      console.log(this.editedItem);
      this.addForm.setValue({
        itemName: this.editedItem.name,
        amount: this.editedItem.amount,
      });
    });
  }

  onSubmit() {
    const ingName = this.addForm.value.itemName;
    const ingAmount = this.addForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editingItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.addForm.reset();
  }

  onClear() {
    this.addForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.slService.delete(this.editingItemIndex);
    this.onClear();
  }
}
