import { reduxForm } from 'redux-form';

export CommentForm from './CommentForm';

export default (Component, name) => {
  return reduxForm({
    form: name,
    destroyOnUnmount: true
  })(Component);
};
