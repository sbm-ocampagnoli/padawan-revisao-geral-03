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
}
