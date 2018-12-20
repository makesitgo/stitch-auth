import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { StitchUser } from 'mongodb-stitch-browser-sdk';
import { urls } from '../../../utils';
import { Alert, AppState, ackAlert, logout } from '../../../state';
import { Header, Content, Footer } from '..';

interface StateProps {
  user?: StitchUser;
  alerts: Alert[];
  working: boolean;
}

interface DispatchProps {
  ackAlert: () => void;
  gotoHome: () => void;
  gotoLogin: () => void;
  logout: () => Promise<void>;
}

type Props = StateProps & DispatchProps;

class App extends React.Component<Props> {
  render() {
    const { alerts, working, user, ackAlert, gotoHome, gotoLogin, logout } = this.props;
    return (
      <div className="app">
        <Header user={user} gotoHome={gotoHome} gotoLogin={gotoLogin} logout={logout} />
        <Content user={user} />
        <Footer alerts={alerts} working={working} ackAlert={ackAlert} />
      </div>
    );
  }
}

const mapStateToProps = ({ session, alerts }: AppState) => ({
  user: session.user,
  alerts: alerts.queue,
  working: alerts.working
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  ackAlert: () => dispatch(ackAlert()),
  gotoHome: () => dispatch(push(urls.home())),
  gotoLogin: () => dispatch(push(urls.login())),
  logout: () => dispatch<any>(logout.action()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
