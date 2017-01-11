import { normalize, schema } from 'normalizr';

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.username.toLowerCase()
});

const linkSchema = new schema.Entity('links', {
  user: userSchema
});

const directorySchema = new schema.Entity('directories', {}, {
  idAttribute: directory => directory.name.toLowerCase()
});

const commentSchema = new schema.Entity('comments', {
  author: userSchema
});

const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  LINK: linkSchema,
  LINK_ARRAY: [linkSchema],
  DIRECTORY: directorySchema,
  DIRECTORY_ARRAY: [directorySchema],
  COMMENT: commentSchema,
  COMMENT_ARRAY: [commentSchema]
};

export default Schemas;
