import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { StitchUser } from 'mongodb-stitch-browser-sdk';
import { AppState, logout } from '../../../state';

interface StateProps {
  user?: StitchUser;
}

interface DispatchProps {
  gotoLogin: () => void;
  logout: () => Promise<void>;
}

type Props = StateProps & DispatchProps;

class Header extends React.Component<Props> {
  render() {
    const { gotoLogin, logout, user } = this.props;
    return (
      <div className="header">
        <h1>stitch auth</h1>
        {!user && <button onClick={gotoLogin}>login</button>}
        {user && (
          <div className="header-rhs">
            <p>logged in as {user.profile.email}</p>
            <button onClick={logout}>logout</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.session.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  gotoLogin: () => dispatch(push('/login')),
  logout: () => dispatch<any>(logout.action()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
