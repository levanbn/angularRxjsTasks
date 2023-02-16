import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  of,
  from,
  switchMap,
  map,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { About } from 'src/app/interfaces/IHomework';

class AboutPerson {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
    public id: number
  ) {}
}

@Component({
  selector: 'app-homework1',
  templateUrl: './homework1.component.html',
  styleUrls: ['./homework1.component.scss'],
})
export class Homework1Component {
  inputContent = new FormControl();

  itemsList: About[] = [
    new AboutPerson('leva', 'begasha', 24, 1),
    new AboutPerson('kote', 'kirkita', 23, 2),
    new AboutPerson('giush', 'bazera', 27, 3),
    new AboutPerson('kote', 'shavwvera', 26, 4),
    new AboutPerson('gio', 'beru', 22, 5),
    new AboutPerson('ana', 'mchedlo', 26, 6),
    new AboutPerson('deme', 'pirovneba', 21, 7),
    new AboutPerson('gio', 'chapcho', 20, 8),
  ];

  search$ = of(this.itemsList);

  ngOnInit() {
    this.inputContent.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          return this.search$.pipe(
            map((userObj) =>
              userObj.filter(
                (e) =>
                  e.firstName.toLowerCase().includes(value.toLowerCase()) ||
                  e.lastName.toLowerCase().includes(value.toLowerCase()) ||
                  (e.firstName + ' ' + e.lastName)
                    .toLowerCase()
                    .includes(value.toLowerCase())
              )
            ),
            map((e) => e.map((x) => `${x.firstName} ${x.lastName}`))
          );
        })
      )
      .subscribe(console.log);
  }
}
