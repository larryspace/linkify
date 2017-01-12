import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import ProfileCard from '../../components/ProfileCard';
import Spinner from '../../components/Spinner';

import { setPageInfo, loadUser } from '../../actions';

class ProfileContainer extends Component {

  componentDidMount() {
    this.props.setPageInfo({ title: 'Profile' });

    this.props.loadUser({ id: this.props.params.id });
  }

  componentWillReceiveProps(nextProps){
    const {
      id,
    } = nextProps.params;

    if(this.props.params.id !== id){
      this.props.loadUser({ id });
    }
  }

  render() {

    const {
      user: { username, avatar },
      isFetchingUser
    } = this.props;

    if(isFetchingUser){
      return (<Spinner />);
    }

    return (
      <Container>
      <ProfileCard
        username={ username }
        avatar={ avatar }
      />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  const {
    entities: { users },
    entity: { user }
  } = state;

  const userId = ownProps.params.id || state.Auth.user;

  return {
    isFetchingUser: user.isFetching,
    user: users[userId] || {},
  }
}


export default connect(mapStateToProps,
  {
    setPageInfo,
    loadUser
  }
)(ProfileContainer);
