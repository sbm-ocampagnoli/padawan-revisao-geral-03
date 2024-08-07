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

  constructor(private service: FruitService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((fruits: Fruit[]) => {
      this.fruits = fruits;
      console.log(this.fruits);
    });
  }

  openToEdit() {
    this.editMode = true;
  }

  view() {
    this.editMode = false;
  }
  exit() {
    throw new Error('Method not implemented.');
  }

  update(_t4: Fruit) {
    throw new Error('Method not implemented.');
  }

  delete(fruit: Fruit) {
    this.service.delete(fruit).subscribe(() => {
      window.location.reload();
    });
  }
}
