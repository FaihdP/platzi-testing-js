test('test obj', () => {
  const obj = {
    name: 'Faihd',
    age: 30,
  };

  expect(obj).toEqual({
    name: 'Faihd',
    age: 30,
  });
});

test('null', () => {
  const obj = null;

  expect(obj).toBeNull();
  expect(obj).toBeDefined();
  expect(obj).not.toBeUndefined();
  expect(obj).not.toBeTruthy();
  expect(obj).toBeFalsy();
});
