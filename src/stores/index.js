import { autorun } from 'mobx';

import UserStore from './userStore';

const userStore = new UserStore();

autorun(() => {
  console.log('SETTING new user =>>::', userStore.user);
})

export { userStore };