if (process.env.NODE_ENV === 'production') {
  require('./index.prod');
} else {
  require('./index.dev');
}
