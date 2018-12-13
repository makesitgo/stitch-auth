import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import { AppState, TokenDataWithPassword, resetPassword } from '../../state';
import { ResetPasswordForm } from '../components';

interface StateProps {
  search: string;
}

interface DispatchProps {
  resetPassword: (data: TokenDataWithPassword) => Promise<void>
  gotoLogin: () => void;
}

type Props = StateProps & DispatchProps;

class ResetPassword extends React.Component<Props> {

  handleResetPassword = (password: string) => {
    const { search, resetPassword } = this.props;
    const values = queryString.parse(search);

    const token = values.token as string;
    const tokenId = values.tokenId as string;

    return resetPassword({ token, tokenId, password });
  }

  render() {
    return <div>
      <h1>reset password</h1>
      <ResetPasswordForm handleSubmit={this.handleResetPassword} />
    </div>;
  }
}

const mapStateToProps = (state: AppState) => ({
  search: state.router.location.search,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetPassword: (data: TokenDataWithPassword) => dispatch<any>(resetPassword.action(data)),
  gotoLogin: () => dispatch(push('/login')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
