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

  createPost(user, postProps, okHandler, errorHandler) {
    const date = new Date();
    const {title, content} = postProps;
    const id = date.toISOString();
    const post = {id, content, title, created: date, modified: date, lastEdited: null, user: user.name}
    this.posts.unshift(post);
    if(okHandler){
      okHandler(post);
    }
    this.onPostChangedHandlers.forEach(handler => handler(this.getPosts()));
    return id;
  }

  editPost(user, newPost, okHandler){
    for (let i in this.posts) {
      if (this.posts.hasOwnProperty(i)) {
        const post = this.posts[i];
        if (post.id === newPost.id) {
          const {title, content} = newPost;
          const currentDate = new Date();
          if (title !== post.title || content !== post.content) {
            post.title = title;
            post.content = content;
            post.lastEdited = currentDate;
            post.modified = currentDate;
            if(okHandler){
              okHandler(Object.create(post));
            }
            this.onPostChangedHandlers.forEach(handler => handler(this.getPosts()));
          }
          return newPost.id;
        }
      }
    }
  }

  removePost(user, postId, okHandler) {
    for (let i in this.posts) {
      if (this.posts.hasOwnProperty(i)) {
        const post = this.posts[i];
        if (post.id === postId) {
          this.posts.splice(i, 1);
          if(okHandler){
            okHandler(post);
          }
          this.onPostChangedHandlers.forEach(handler => handler(this.getPosts()));
          return;
        }
      }
    }
  }

  getPostById(id) {
    for(let i in this.posts){
      if (this.posts[i].id === id) {
        let post = Object.create(this.posts[i]);
        if(Array.isArray(post.comments)){
          post.comments = post.comments.map(comment => Object.create(comment));
        } else {
          post.comments = [];
        }
        return post;
      }
    }
  }

  getPosts() {
    return this.posts.map(post => {
      const cpost = Object.create(post)
      if(Array.isArray(post.comments)){
        cpost.comments = post.comments.map(comment => Object.create(comment));
      } else {
        cpost.comments = [];
      }
      return cpost;
    });
  }

  createComment(user, postId, commentProps) {
    const posts = this.posts;
    for (let i in posts) {
      if (posts.hasOwnProperty(i) && posts[i].id === postId) {
        const post = posts[i];
        const date = new Date();
        post.modified = date;
        const comment = {
          id: date.toISOString(),
          created: date,
          modified: date,
          user: user.name,
          content: commentProps.content
        }
        if(Array.isArray(post.comments)){
          post.comments.push(comment);
        } else {
          post.comments = [comment];
        }
        this.onPostChangedHandlers.forEach(handler => handler(this.getPosts()));
        return comment.id;
      }
    }
  }

  editComment(user, postId, commentProps){
    const posts = this.posts;
    for (let i in posts) {
      if (posts.hasOwnProperty(i) && posts[i].id === postId) {
        const post = posts[i];
        for(let j in post.comments){
          if (post.comments.hasOwnProperty(j) && post.comments[j].id === commentProps.id) {
            const date = new Date();
            post.modified = date;
            const comment = post.comments[j];
            comment.modified = date;
            comment.content = commentProps.content;
            this.onPostChangedHandlers.forEach(handler => handler(this.getPosts()));
            return;
          }
        }
      }
    }
  }

  removeComment(user, postId, commentId){
    const posts = this.posts;
    for (let i in posts) {
      if (posts.hasOwnProperty(i) && posts[i].id === postId) {
        const post = posts[i];
        for(let j in post.comments){
          if (post.comments.hasOwnProperty(j) && post.comments[j].id === commentId) {
            post.modified = new Date();
            post.comments.splice(j, 1);
            this.onPostChangedHandlers.forEach(handler => handler(this.getPosts()));
            return;
          }
        }
      }
    }
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
    window.resetModel = () => {
      localStorage.removeItem("users");
      localStorage.removeItem("posts");
      this.users.clear();
      this.posts = [];
      this.onPostChangedHandlers.forEach(handler => handler(this.getPosts()));
    }

    window.addEventListener('storage', (e) => {
      console.log('I happened');
      if (e.key === 'posts' || e.key === 'users') {
        this.load();
        this.onPostChangedHandlers.forEach(handler => handler(this.getPosts()));
      }
    });
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
    this.posts.forEach(fenixDown);

    function fenixDown(o){
      o.created = new Date(o.created);
      o.modified = new Date(o.modified);
      o.lastEdited = o.lastEdited && new Date(o.lastEdited);
      if(o.comments){
        o.comments.forEach(fenixDown);
      }
    }


  }
}
