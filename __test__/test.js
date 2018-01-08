function test(args) {
  const { id, ...other } = args;
  console.log(other);
}

test({ id: 1, test: 'hello wold' });