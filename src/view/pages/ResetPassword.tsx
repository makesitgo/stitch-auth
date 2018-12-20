import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import { urls } from '../../utils';
import { AppState, TokenDataWithPassword, resetPassword } from '../../state';
import { ResetPasswordForm } from '../components';

interface StateProps {
  search: string;
}

interface DispatchProps {
  resetPassword: (data: TokenDataWithPassword) => Promise<void>;
  gotoHome: () => void;
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

class ResetPassword extends React.Component<Props> {
  resetPassword = (password: string) => {
    const { search, resetPassword } = this.props;
    const { token, tokenId } = queryString.parse(search);
    return resetPassword({ token: paramIsString(token), tokenId: paramIsString(tokenId), password });
  };

  render() {
    const { gotoHome } = this.props;
    return (
      <div className="reset-password">
        <h1>reset password</h1>
        <ResetPasswordForm handleSubmit={this.resetPassword} gotoHome={gotoHome} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  search: state.router.location.search,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPassword: (data: TokenDataWithPassword) => dispatch<any>(resetPassword.action(data)),
  gotoHome: () => dispatch(push(urls.home())),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
