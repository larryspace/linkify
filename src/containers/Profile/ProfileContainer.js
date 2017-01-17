import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';

import Container from '../../components/Container';
import ProfileCard from '../../components/ProfileCard';
import Spinner from '../../components/Spinner';
import NotFound from '../../components/NotFound';

import LinksContainer from '../Controlled/Links';

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
      user: { id, username, avatar, comment_count, karma, link_count},
      isFetchingUser
    } = this.props;

    const {
      type = 'links'
    } = this.props.params;

    if(isFetchingUser){
      return (<Spinner />);
    }

    if(!id && !isFetchingUser){
      return (<NotFound />);
    }

    return (
      <Container>
      <Row className="linkpost">
        <Col xs="12" sm="5" lg="3" className="">
          <ProfileCard
            id={ id }
            username={ username }
            avatar={ avatar }
            comment_count={ comment_count }
            link_count={ link_count }
            karma={ karma }
          />
        </Col>
        <Col xs="12" sm="7" lg="9" className="">
          {type === 'links' && id && (
            <LinksContainer
              id={ id }
              type={'user'}
              sort={'hot'}
            />
          )}
          {type === 'comments' && id && (
            <span>Component not finished. GO AWAY</span>
          )}
        </Col>
      </Row>
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
