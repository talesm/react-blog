class UserHandle {
  constructor(name){
    this.name = name;
  }

  isSame(other) {
    return this.name === other.name;
  }
}

export default class {
  constructor() {
    this.users = new Map();
    this.posts = [];
    this.onCreatePostHandlers = [];
  }

  postsCount() {
    return this.posts.length;
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
    const date = new Date();
    let post = {id:date.toISOString(), content, title, created: date, modified: date, user: user.name}
    this.posts.unshift(post);
    this.onCreatePostHandlers.forEach(handler => handler(post));
  }

  getPosts() {
    return this.posts;
  }
}
