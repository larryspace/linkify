import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import SubHeader from '../../components/SubHeader';
import SubList from '../../components/SubList';

import { setPageInfo } from '../../actions';


class SubContainer extends Component {

  componentDidMount() {
    this.props.setPageInfo({ title: '' });
  }

  render() {

    return (
      <div>
      <SubHeader
        title={ "Title" }
      />
      <Container>
        <SubList />
      </Container>
      </div>
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
)(SubContainer);
