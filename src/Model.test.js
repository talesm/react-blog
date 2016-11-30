import Model from './Model.js';

it('Create our model', () => {
  let model = new Model();
  expect(model.postsCount()).toBe(0);
  expect(model.usersCount()).toBe(0);
});

it('Creates an user', () => {
  let model = new Model();
  let user = model.createUser('Fulano de Tal', 'LePassword');
  expect(model.usersCount()).toBe(1);
  expect(user).not.toBeNull();
  expect(() => model.createUser('Fulano de Tal', 'Le Password')).toThrowError('User already exists');
  expect(model.usersCount()).toBe(1);
});

it('Recovers authenticated user', () => {
  let model = new Model();
  let user1 = model.createUser('Fulano de Tal', 'LePassword');
  let user2 = model.createUser('Beltrano', 'LePassword');
  expect(model.authUser('Fulano de Tal', 'LePassword').isSame(user1)).toBe(true);
  expect(model.authUser('Beltrano', 'LePassword').isSame(user1)).not.toBe(true);
  expect(() => model.authUser('Invalid User')).toThrowError('Invalid User or Password')
});

it('Adds a post', () => {
  const model = new Model();
  const user = model.createUser('Fulano de Tal', 'LePassword');
  const testPost = {title: 'A title', content: 'The content'};
  const okHandler = jest.fn((post) => {
    expect(post.id).not.toBeFalsy();
    expect(post.content).toBe('The content');
    expect(post.title).toBe('A title');
    expect(post.created).toBeInstanceOf(Date);
    expect(post.modified).toBeInstanceOf(Date);
    expect(post.modified).toEqual(post.created);
    expect(post.user).toBe('Fulano de Tal');
  });
  model.createPost(user, testPost, okHandler);
  expect(model.postsCount()).toBe(1);
  expect(okHandler).toBeCalled();
});

it('Edit a post', ()=>{
  const model = new Model();
  const user = model.createUser('Fulano de Tal', 'LePassword');
  const testPost = {title: 'A title', content: 'The content'};
  const postId = model.createPost(user, testPost);
  expect(model.postsCount()).toBe(1);
  const oldPost = model.getPostById(postId);
  const okHandler = jest.fn((newPost) => {
    expect(newPost.id).toBe(oldPost.id);
    expect(newPost.content).toBe('New content');
    expect(newPost.title).toBe('New title');
    expect(newPost.created).toEqual(oldPost.created);
    expect(newPost.modified).toBeInstanceOf(Date);
    expect(newPost.modified).not.toBe(newPost.created);
    expect(newPost.user).toEqual(oldPost.user);
  });
  let post = Object.create(oldPost);
  post.content = 'New content';
  post.title = 'New title';
  post.created = 'Bogus'; // Will be ignored
  post.modified = 'Bogus'; // Will be ignored
  post.user = 'Bogus'; // Will be ignored
  model.editPost(user, post, okHandler);
  expect(okHandler).toBeCalled();
});

it('Remove a post', ()=>{
    const model = new Model();
    const user = model.createUser('Fulano de Tal', 'LePassword');
    const testPost = {title: 'A title', content: 'The content'};
    const postId = model.createPost(user, testPost);
    const okHandler = jest.fn();
    expect(model.postsCount()).toBe(1);
    model.removePost(user, postId, okHandler);
    expect(okHandler).toBeCalled();
    expect(model.postsCount()).toBe(0);
});

it('Adds a comment', ()=>{
  const model = new Model();
  const user = model.createUser('Fulano de Tal', 'LePassword');
  const testPost = {title: 'A title', content: 'The content'};
  const postId = model.createPost(user, testPost);
  let post = model.getPostById(postId);
  expect(post.comments.length).toBe(0);
  let commentId = model.createComment(user, postId, {content: 'The content'});
  post = model.getPostById(postId);
  expect(post.comments.length).toBe(1);
  expect(post.comments[0].content).toBe("The content")
});

it("Edits a comment", ()=>{
  const model = new Model();
  const user = model.createUser('Fulano de Tal', 'LePassword');
  const testPost = {title: 'A title', content: 'The content'};
  const postId = model.createPost(user, testPost);
  let commentId = model.createComment(user, postId, {content: 'The content'});
  model.editComment(user, postId, {id: commentId, content: 'New content'});
  const post = model.getPostById(postId);
  expect(post.comments.length).toBe(1);
  expect(post.comments[0].content).toBe("New content")
});

it("Removes a comment", ()=>{
  const model = new Model();
  const user = model.createUser('Fulano de Tal', 'LePassword');
  const testPost = {title: 'A title', content: 'The content'};
  const postId = model.createPost(user, testPost);
  let commentId = model.createComment(user, postId, {content: 'The content'});
  model.removeComment(user, postId, commentId);
  const post = model.getPostById(postId);
  expect(post.comments.length).toBe(0);
});
