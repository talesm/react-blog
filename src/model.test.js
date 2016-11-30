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
  let model = new Model();
  let user = model.createUser('Fulano de Tal', 'LePassword');
  let handler = jest.fn((post) => {
    expect(post.id).not.toBeFalsy();
    expect(post.content).toBe('The content');
    expect(post.title).toBe('A title');
    expect(post.created).toBeInstanceOf(Date);
    expect(post.modified).toBeInstanceOf(Date);
    expect(post.modified).toEqual(post.created);
    expect(post.user).toBe('Fulano de Tal');
  });
  model.onPostChanged(handler);
  expect(handler).not.toBeCalled();
  model.createPost(user, 'A title', 'The content');
  expect(model.postsCount()).toBe(1);
  expect(handler).toBeCalled();
});
