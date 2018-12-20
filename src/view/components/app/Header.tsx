import React from 'react';
import { StitchUser } from 'mongodb-stitch-browser-sdk';

interface Props {
  user?: StitchUser;
  gotoHome: () => void;
  gotoLogin: () => void;
  logout: () => Promise<void>;
}

class Header extends React.Component<Props> {
  render() {
    const { gotoHome, gotoLogin, logout, user } = this.props;
    return (
      <div className="header">
        <h1 onClick={gotoHome}>stitch auth</h1>
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

export default Header;
