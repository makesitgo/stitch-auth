import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { urls } from '../../utils';
import { resendConfirmationEmail } from '../../state';

interface DispatchProps {
  resendConfirmationEmail: () => Promise<void>;
}

type Props = DispatchProps;

class WaitingRoom extends React.Component<Props> {
  render() {
    const { resendConfirmationEmail } = this.props;
    return (
      <div className="waiting-room">
        <p>a confirmation email has been sent to your inbox.</p>
        <div>
          <p>didn't receive an email?</p>
          <button onClick={resendConfirmationEmail}>send it again</button>
        </div>
        <Link to={urls.register()}>or re-register</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  resendConfirmationEmail: () => dispatch(resendConfirmationEmail.action()),
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(WaitingRoom);
