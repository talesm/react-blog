class UserHandle {
  constructor(name){
    this.name = name;
  }

  isSame(other) {
    return this.name == other.name;
  }
}

export default class {
  constructor() {
    this.users = new Map();
    this.posts = 0;
    this.onCreatePostHandlers = [];
  }

  postsCount() {
    return this.posts;
  }

  usersCount() {
    return this.users.size;
  }

  createUser(name, password) {
    if(!this.users.has(name)){
      this.users.set(name, {name, password});
       // Of course in a serious system I would return something using crypto.
      return new UserHandle(name);
    }
    throw new Error('User already exists');
  }

  authUser(name, password) {
    if (this.users.has(name)) {
      return new UserHandle(name);
    }
    throw new Error('Invalid User or Password')
  }

  onCreatePost(f) {
    this.onCreatePostHandlers.push(f);
  }

  createPost(user, title, content) {
    this.posts ++;
    const date = new Date();
    let post = {content, title, created: date, modified: date, user: user.name}
    this.onCreatePostHandlers.forEach(handler => handler(title, post));
  }
}
