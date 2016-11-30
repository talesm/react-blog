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
    this.onPostChangedHandlers = [];

    this.load();
    setInterval(this.persist.bind(this), 1000);
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

  onPostChanged(f) {
    this.onPostChangedHandlers.push(f);
  }

  createPost(user, title, content) {
    const date = new Date();
    let post = {id:date.toISOString(), content, title, created: date, modified: date, user: user.name}
    this.posts.unshift(post);
    this.onPostChangedHandlers.forEach(handler => handler(post));
  }

  getPosts() {
    return this.posts;
  }

  persist() {
    const localStorage = window.localStorage;
    if(!localStorage) {
      console.log("Can not persist");
    }
    const users = [];
    for(let [_ ,value] of this.users) {
      users.push(value);
    }
    localStorage["users"] = JSON.stringify(users);
    localStorage["posts"] = JSON.stringify(this.posts);
  }

  load() {
    const localStorage = window.localStorage;
    if(!localStorage) {
      console.log("Can not load");
      return;
    }
    const users = JSON.parse(localStorage["users"]||"[]");
    if(Array.isArray(users)){
      this.users.clear();
      users.forEach(user => this.users.set(user.name, user));
    }
    const posts = JSON.parse(localStorage["posts"]||"[]");
    this.posts = Array.isArray(posts)? posts : [];

    window.resetModel = () => {
      localStorage.removeItem("users");
      localStorage.removeItem("posts");
      this.users.clear();
      this.posts = [];
      this.onPostChangedHandlers.forEach(handler => handler({}));
    }

    window.addEventListener('storage', (e) => {
      console.log('I happened');
      if (e.key === 'posts' || e.key === 'users') {
        this.load();
        this.onPostChangedHandlers.forEach(handler => handler({}));
      }
    })
  }
}
