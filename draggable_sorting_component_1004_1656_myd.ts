// 代码生成时间: 2025-10-04 16:56:49
// draggable_sorting_component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { EntitySubscriberInterface, UpdateEvent } from 'typeorm';

// Define a simple entity class for demonstration purposes
export class Item {
  id: string;
  name: string;
  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}

// Define a service to handle the logic for the items
export class ItemService {
  private items: Item[] = [];
  private itemsChanged = new Subscription();

  addItem(item: Item): void {
    this.items.push(item);
    this.itemsChanged.next(this.items);
  }

  getItems(): Item[] {
    return this.items;
  }

  // Emits changes to subscribed components
  getChanges(): Subscription {
    return this.itemsChanged;
  }
}

// Define the component that uses the service
@Component({
  selector: 'app-draggable-sorting',
  template: `
    <div class="container">
      <ng-container *ngFor="let item of items; let i = index" cdkDrag>
        <div class="item" cdkDragHandle>{{ item.name }}</div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./draggable_sorting_component.css'],
  providers: [ItemService]
})
export class DraggableSortingComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  private subscription: Subscription;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    // Subscribe to changes in the items array
    this.subscription = this.itemService.getChanges().subscribe((updatedItems: Item[]) => {
      this.items = updatedItems;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from changes to prevent memory leaks
    this.subscription.unsubscribe();
  }

  // Function to handle the drop event and reorder items
  onDrop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    }
    // If you need to update the server or handle other logic, do it here
  }
}

// Helper function to move an item in an array
function moveItemInArray(arr: any[], fromIndex: number, toIndex: number): void {
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= arr.length || toIndex >= arr.length) {
    throw new Error('Invalid array indices');
  }
  const item = arr.splice(fromIndex, 1)[0];
  arr.splice(toIndex, 0, item);
}

// Implement EntitySubscriberInterface for listening to changes in the Item entity
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  listenTo() {
    return Item;
  }

  afterUpdate(event: UpdateEvent<Item>): Promise<void> | void {
    // Handle any logic after an Item is updated
  }
}

// Add Angular module imports and declarations
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { DraggableSortingComponent } from './draggable_sorting_component';

@NgModule({
  declarations: [DraggableSortingComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [DraggableSortingComponent]
})
export class DraggableSortingModule {}
