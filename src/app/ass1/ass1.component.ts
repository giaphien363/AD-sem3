import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ass1',
  templateUrl: './ass1.component.html',
  styleUrls: ['./ass1.component.css'],
})
export class Ass1Component implements OnInit {
  inputTask: string = 'Read Book';

  listTask = [
    { id: 1, name: 'Clean house', status: false }
];

  public constructor() {}

  submitInput = () => {
    if (this.inputTask === '') {
      alert('You need type something!!!');
      return;
    }

    let newId = this.listTask[this.listTask.length - 1].id + 1;
    let newItem = { id: newId, name: this.inputTask, status: false };
    this.listTask.push(newItem);

    this.inputTask = '';
  };

  changeTask = (id: number) => {
    // get index from id of item
    let index = this.listTask.findIndex((ele) => ele.id === id);

    this.listTask[index].status = true;
  };

  deleteTask = (id: number) => {
    // get index from id of item
    let index = this.listTask.findIndex((ele) => ele.id === id);
    if (index != -1) {
      this.listTask.splice(index, 1);
    }
  };

  ngOnInit(): void {}
}
