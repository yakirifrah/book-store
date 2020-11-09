import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import API from '../api';
import { authAdminListener, authUserListener } from '../utils';

export class AuthStore {
  admin = {};
  user = {};
  state = '';

  constructor() {
    makeAutoObservable(this, {
      admin: observable,
      user: observable,
      login: action,
    });
    this.admin = authAdminListener();
    this.user = authUserListener();
  }

  async login(data = {}) {
    this.state = 'pending';
    const { userName, password, role } = data;
    try {
      const res = await API.signInUser({
        userName,
        password,
        role,
      });

      if (role === 'admin') {
        sessionStorage.setItem(
          'admin',
          JSON.stringify({
            token: res.data.token,
            user_id: res.data.user_id,
            userName,
            role,
            login: true,
          }),
        );
        runInAction(() => {
          this.state = 'done';
          this.admin = { userName, role, token: res.data.token };
        });
      } else {
        localStorage.setItem(
          'user',
          JSON.stringify({
            token: res.data.token,
            user_id: res.data.user_id,
            userName,
            role,
            login: true,
          }),
        );
        runInAction(() => {
          this.state = 'done';
          this.user = { userName, role, token: res.data.token };
        });
      }
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
      throw error;
    }
  }
  async createUser(data = {}) {
    this.state = 'pending';
    const { userName, password, role } = data;
    try {
      const res = await API.signUpUser({
        userName,
        password,
        role,
      });
      if (role === 'admin') {
        sessionStorage.setItem(
          'admin',
          JSON.stringify({
            token: res.data.token,
            userName,
            role,
            login: true,
          }),
        );
        runInAction(() => {
          this.state = 'done';
          this.admin = { userName, role, token: res.data.token };
        });
      } else {
        localStorage.setItem(
          'user',
          JSON.stringify({
            token: res.data.token,
            userName,
            role,
            login: true,
          }),
        );
        this.admin = { userName, role, token: res.data.token };
      }
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
      throw error;
    }
  }
}
