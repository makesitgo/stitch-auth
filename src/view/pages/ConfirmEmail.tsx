import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { urls } from '../../utils';
import { AppState, TokenData, confirmUser } from '../../state';

interface StateProps {
  search: string;
}

interface DispatchProps {
  confirmUser: (tokenData: TokenData) => Promise<void>;
}

type Props = StateProps & DispatchProps;

const paramIsString = (param: string | string[] | undefined) => {
  if (param) {
    if (typeof param === 'string') {
      return param;
    }
  }
  throw new Error('provided a non-string input but expected one');
};

class ConfirmEmail extends React.Component<Props> {
  ['confirmUser'] = (tokenData: TokenData) => this.props.confirmUser(tokenData);

  render() {
    const { token, tokenId } = queryString.parse(this.props.search);
    if (token && tokenId) {
      this.confirmUser({ token: paramIsString(token), tokenId: paramIsString(tokenId) });
      return <Redirect to={urls.login()} />;
    }
    return (
      <div className="confirm-email">
        <h1>email confirmed</h1>
        <p>thank you for confirming your email.</p>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  search: state.router.location.search,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  confirmUser: (tokenData: TokenData) => dispatch<any>(confirmUser.action(tokenData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmEmail);
