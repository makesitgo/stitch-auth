import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import { AppState, TokenData, confirmUser } from '../../state';

interface StateProps {
  search: string;
}

interface DispatchProps {
  confirmUser: (tokenData: TokenData) => Promise<void>;
  gotoLogin: () => void;
}

type Props = StateProps & DispatchProps;

class ConfirmEmail extends React.Component<Props> {
  render() {
    const { search, confirmUser, gotoLogin } = this.props;
    if (search) {
      const values = queryString.parse(search);

      if (values.token && values.tokenId) {
        const token = values.token as string;
        const tokenId = values.tokenId as string;

        confirmUser({ token, tokenId }).then(() => gotoLogin());
        return null;
      }

    }
    return <div>thank you for confirming your email.</div>;
  }
}

const mapStateToProps = (state: AppState) => ({
  search: state.router.location.search,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  confirmUser: (tokenData: TokenData) => dispatch<any>(confirmUser.action(tokenData)),
  gotoLogin: () => dispatch(push('/login')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmEmail);
