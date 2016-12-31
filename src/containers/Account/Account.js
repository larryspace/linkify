import React, { Component, PropTypes } from 'react';
import { Match, Link } from 'react-router';
import { connect } from 'react-redux';

import { setPageInfo, updateInfo, updateAvatar } from '../../actions';

import Container from '../../components/Container';
import AccountSettingsForm from '../../components/Forms/AccountSettings';
import AvatarSettingsForm from '../../components/Forms/AvatarSettings';

class AccountContainer extends Component {

  componentDidMount() {
    this.props.setPageInfo({ title: 'Account' });
  }

  render() {
    return (
      <Container>
      <Match exactly pattern="/account/settings" render={(matchProps) => (
        <AccountSettingsForm
          initialValues = {this.props.userInfo}
          onSubmit = { this.props.updateInfo }
          {...matchProps}
        />
      )}/>
      <Match exactly pattern="/account/avatar" render={(matchProps) => (
        <AvatarSettingsForm
          avatar={'http://localhost/' + this.props.userInfo.avatar}
          onSubmit = { this.props.updateAvatar }
          {...matchProps}
        />
      )}/>
      <Match exactly pattern="/account/password" component={AccountSettingsForm}/>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.Auth.userInfo || {},
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    updateInfo,
    updateAvatar
  }
)(AccountContainer);
