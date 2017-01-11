import React, { Component, PropTypes } from 'react';
import { Match, Link } from 'react-router';
import { connect } from 'react-redux';

import { setPageInfo, updateInfo, updateAvatar, updatePassword } from '../../actions';

import Container from '../../components/Container';
import AccountSettingsForm from '../../components/Forms/AccountSettings';
import AvatarSettingsForm from '../../components/Forms/AvatarSettings';
import ChangePasswordForm from '../../components/Forms/ChangePassword';

class AccountContainer extends Component {

  componentDidMount() {
    //this.props.setPageInfo({ title: 'Account' });
  }

  render() {

    const {
      user: { username, first_name, last_name, avatar },
      updateInfo,
      updateAvatar,
      updatePassword
    } = this.props;

    return (
      <Container>
      <Match exactly pattern="/account/settings" render={(matchProps) => (
        <AccountSettingsForm
          initialValues = { {username, first_name, last_name} }
          onSubmit = { updateInfo }
          {...matchProps}
        />
      )}/>
      <Match exactly pattern="/account/avatar" render={(matchProps) => (
        <AvatarSettingsForm
          avatar={'http://localhost/' + avatar }
          onSubmit = { updateAvatar }
          {...matchProps}
        />
      )}/>
      <Match exactly pattern="/account/password" render={(matchProps) => (
        <ChangePasswordForm
          onSubmit = { updatePassword }
          {...matchProps}
        />
      )}/>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const {
    entities: { users }
  } = state;

  const user = users[state.Auth.user] || {};

  return {
    user: user,
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    updateInfo,
    updateAvatar,
    updatePassword
  }
)(AccountContainer);
