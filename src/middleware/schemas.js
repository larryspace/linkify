import { normalize, schema } from 'normalizr';

const userSchema = new schema.Entity('users', {});

const linkSchema = new schema.Entity('links', {
  author: userSchema
});

const directorySchema = new schema.Entity('directories', {}, {
  idAttribute: directory => directory.name.toLowerCase()
});

const commentSchema = new schema.Entity('comments', {
  author: userSchema
});

const authSchema = new schema.Entity('auth', {
  user: userSchema
});

const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  LINK: linkSchema,
  LINK_ARRAY: [linkSchema],
  DIRECTORY: directorySchema,
  DIRECTORY_ARRAY: [directorySchema],
  COMMENT: commentSchema,
  COMMENT_ARRAY: [commentSchema],
  AUTH: authSchema
};

export default Schemas;
