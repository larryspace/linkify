import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import ProfileCard from '../../components/ProfileCard';

import { setPageInfo } from '../../actions';


class ProfileContainer extends Component {

  componentDidMount() {
    this.props.setPageInfo({ title: 'Profile' });
  }

  render() {

    return (
      <Container>
      <ProfileCard />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}


export default connect(mapStateToProps,
  {
    setPageInfo
  }
)(ProfileContainer);
