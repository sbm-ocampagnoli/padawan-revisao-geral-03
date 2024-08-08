import { Component, Input, OnInit } from '@angular/core';
import { Fruit } from 'src/app/interface/fruit';
import { FruitService } from 'src/app/service/fruit.service';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css'],
})
export class FruitsComponent implements OnInit {
  @Input() fruits: Fruit[] = [];
  editMode: boolean = false;
  addMode: boolean = false;
  newFruit: Fruit = { origin: '', importDate: new Date(), quantity: 0 };
  fruitToSearch: Fruit = { origin: '', importDate: undefined, quantity: 0 };

  constructor(private service: FruitService) {}

  ngOnInit(): void {
    this.getAll();
  }

  clearFruits() {
    this.fruits = [];
  }

  getAll() {
    this.service.getAll().subscribe((fruits: Fruit[]) => {
      this.fruits = fruits;
    });
  }

  openToEdit() {
    this.editMode = true;
  }

  openToAdd() {
    this.addMode = true;
  }

  view() {
    this.editMode = false;
    this.addMode = false;
  }

  add(newFruit: Fruit) {
    this.service.add(newFruit).subscribe(() => {
      this.newFruit = { origin: '', quantity: 0, importDate: new Date() };
      this.clearFruits();
    });
  }

  update(fruit: Fruit) {
    this.service.update(fruit).subscribe(() => {
      this.editMode = false;
      this.clearFruits();
    });
  }

  delete(fruit: Fruit) {
    this.service.delete(fruit).subscribe(() => {
      this.clearFruits();
    });
  }

  search(fruit: Fruit) {
    debugger;
    this.clearFruits();
    this.service.filterComposed(fruit).subscribe((fruits) => {
      this.fruits = fruits;
    });
  }
}
