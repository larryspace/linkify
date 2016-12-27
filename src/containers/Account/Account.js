import React, { Component, PropTypes } from 'react';
import { Match, Link } from 'react-router';
import { connect } from 'react-redux';

import { setPageInfo, updateAvatar } from '../../actions';

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
      <Match exactly pattern="/account/settings" component={AccountSettingsForm}/>
      <Match exactly pattern="/account/avatar" render={(matchProps) => (
        <AvatarSettingsForm
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
    userInfo: state.Auth.userInfo,
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    updateAvatar
  }
)(AccountContainer);
