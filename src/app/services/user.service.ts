import { Injectable } from '@angular/core';

import { LocalStorageKeys } from '../constants/local-storage-keys.constants';
import { USERNAME_PART } from '../constants/user.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string;

  constructor() {
    this.initializeUsername();
  }

  getUsername(): string {
    return this.username;
  }

  private initializeUsername(): void {
    this.username = `${USERNAME_PART} ${this.getTabNumber()}`;
    this.incrementTabNumber();
  }

  private getTabNumber(): number {
    const storedTabNumber = localStorage.getItem(LocalStorageKeys.TAB_NUMBER);
    if (storedTabNumber) {
      return +storedTabNumber;
    } else {
      const initialTabNumber = '1';
      localStorage.setItem(LocalStorageKeys.TAB_NUMBER, initialTabNumber);
      return +initialTabNumber;
    }
  }

  private incrementTabNumber(): void {
    const currentTabNumber = this.getTabNumber();
    const newTabNumber = currentTabNumber + 1;
    localStorage.setItem(LocalStorageKeys.TAB_NUMBER, newTabNumber.toString());
  }
}
