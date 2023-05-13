import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AgeState, FilterParams, User } from './Users.model';
import { data } from './fake-data';

@Injectable({ providedIn: 'root' })
export class UsersService {
  /**
   * @description Returns an observable of User objects that match the filter parameters if they are specified.
   * Otherwise, returns an observable of all User objects.
   */
  getUsers(filterParams?: FilterParams): Observable<User[]> {
    return filterParams
      ? this.getFilteredUsers(filterParams)
      : of(this.createUsersModel());
  }

  /**
   * @description Returns an array of User objects from the original data array based on "User" model
   */
  createUsersModel(): User[] {
    return data.map((user: User) => {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        eyeColor: user.eyeColor,
        birthDate: user.birthDate,
      };
    });
  }

  /**
   * @description Returns an observable of users filtered by the given filter parameters.
   */
  getFilteredUsers(filterParams: FilterParams): Observable<User[]> {
    if (filterParams.firstName && filterParams.lastName) {
      return this.getFilteredByFullName(filterParams);
    } else {
      return this.getFilteredByParams(filterParams);
    }
  }

  /**
   * @description Returns an Observable of User[] filtered by first name and last name in the FilterParams object.
   * If a match is found, it returns an array of users whose first name or last name includes the provided values.
   */

  getFilteredByFullName(filterParams: FilterParams): Observable<User[]> {
    const filteredUsers: User[] = this.createUsersModel().filter(
      (user: User) => {
        const firstName = filterParams.firstName?.toLowerCase();
        const lastName = filterParams.lastName?.toLowerCase();

        return (
          firstName &&
          lastName &&
          (user.firstName.toLowerCase().includes(firstName) ||
            user.lastName.toLowerCase().includes(lastName))
        );
      }
    );

    return of(filteredUsers);
  }

  /**
   * @description Returns an Observable of an array of User objects that match the given filter parameters.
   * If no filter parameters are provided, returns all users.
   */

  getFilteredByParams(filterParams: FilterParams): Observable<User[]> {
    const filteredUsers: User[] = this.createUsersModel().filter(
      (user: User) => {
        if (
          (filterParams.gender &&
            this.filterGender(user, filterParams.gender)) ||
          (filterParams.age &&
            filterParams.ageStatus &&
            this.filterAge(user, filterParams.age, filterParams.ageStatus)) ||
          (filterParams.eyeColor &&
            this.filterEyeColor(user, filterParams.eyeColor)) ||
          (filterParams.birthDate &&
            !this.filterBirthDate(user, filterParams.birthDate))
        )
          return false;

        return true;
      }
    );

    return of(filteredUsers);
  }

  filterGender(user: User, gender: string[]): boolean {
    return gender.length > 0 && gender.indexOf(user.gender) === -1;
  }

  filterAge(user: User, age: string, ageStatus: AgeState): boolean {
    switch (ageStatus) {
      case AgeState.Equal:
        return user.age !== Number(age);
      case AgeState.Greater:
        return user.age < Number(age);
      case AgeState.Smaller:
        return user.age > Number(age);
      default:
        return true;
    }
  }

  filterEyeColor(user: User, eyeColor: string[]): boolean {
    return eyeColor.length > 0 && eyeColor.indexOf(user.eyeColor) === -1;
  }

  filterBirthDate(user: User, birthDate: string): boolean {
    const startDate = new Date(birthDate[0]);
    const endDate = new Date(birthDate[1]);
    const date = new Date(user.birthDate);
    return date > startDate && date < endDate;
  }
}
