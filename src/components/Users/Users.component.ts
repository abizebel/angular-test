import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UsersService } from './Users.service';
import { AppState } from 'src/store/appstate';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, debounceTime, startWith } from 'rxjs';
import { loadUsers } from 'src/store/actions/users-actions';

import {
  AgeState,
  FilterParams,
  Gender,
  SelectData,
  User,
} from './Users.model';

@Component({
  selector: 'users-app',
  templateUrl: './Users.component.html',
})
export class TestComponent implements OnInit {
  users$: Observable<User[]>;
  searchValue = '';
  showFilter = false;
  filterForm: FormGroup;
  eyeColors: SelectData[] = [];

  ageStates: SelectData[] = [
    { name: AgeState.Equal, code: AgeState.Equal },
    { name: AgeState.Greater, code: AgeState.Greater },
    { name: AgeState.Smaller, code: AgeState.Smaller },
  ];

  genders: SelectData[] = [
    { name: Gender.Male, code: Gender.Male },
    { name: Gender.Female, code: Gender.Female },
    { name: Gender.Others, code: Gender.Others },
    { name: Gender.Others, code: Gender.PreferNotToSay },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private service: UsersService,
    private store: Store<AppState>
  ) {
    this.users$ = this.store.pipe(select((state) => state.users));
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchUsers();
  }

  buildForm(): void {
    this.filterForm = this.formBuilder.group({
      gender: [],
      age: null,
      ageStatus: [],
      eyeColor: [],
      birthDate: null,
    });
  }

  fetchUsers(): void {
    this.service.getUsers().subscribe((users: User[]) => {
      this.findEyeColors(users);
      this.store.dispatch(loadUsers({ items: users }));
    });
  }

  applyFilter(): void {
    const { gender, age, ageStatus, birthDate, eyeColor } =
      this.filterForm.getRawValue();

    const filterParams: FilterParams = {
      gender: gender?.map((item: SelectData) => item.name),
      age: age,
      ageStatus: ageStatus?.code ?? AgeState.Equal,
      birthDate: birthDate,
      eyeColor: eyeColor?.map((item: SelectData) => item.name),
    };

    this.service
      .getUsers(filterParams)
      .subscribe((users) => this.store.dispatch(loadUsers({ items: users })));

    this.showFilter = false;
  }

  resetFilter(): void {
    this.service
      .getUsers()
      .subscribe((users) => this.store.dispatch(loadUsers({ items: users })));

    this.filterForm.reset();
    this.showFilter = false;
  }

  /**
   *
   * @description Search firstName and lastName with debounce
   */
  onSearchValue(value: string) {
    const filterParams: FilterParams = {
      firstName: value,
      lastName: value,
    };

    this.service
      .getUsers(filterParams)
      .pipe(startWith([]), debounceTime(500))
      .subscribe((users: User[]) => {
        this.store.dispatch(loadUsers({ items: users }));
      });
  }

  /**
   *
   * @description Find non-repetitive colors with O(n) time complexity
   */
  findEyeColors(users: User[]): void {
    const colors: string[] = [];
    const dictionary = Object.assign({});

    users.forEach((item) => {
      if (dictionary[item.eyeColor] === undefined) {
        dictionary[item.eyeColor] = 0;
      } else {
        dictionary[item.eyeColor]++;
        if (dictionary[item.eyeColor] === 1) {
          colors.push(item.eyeColor);
        }
      }
    });

    this.eyeColors = colors.map((o, i) => {
      return {
        name: o,
        code: String(i + 1),
      };
    });
  }
}
