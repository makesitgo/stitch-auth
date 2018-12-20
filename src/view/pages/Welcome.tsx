import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { urls } from '../../utils';

interface DispatchProps {
  gotoHome: () => void;
}

type Props = DispatchProps;

class Welcome extends React.Component<Props> {
  render() {
    const { gotoHome } = this.props;
    return (
      <div>
        <h1>welcome page</h1>
        <button onClick={gotoHome}>go to home</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  gotoHome: () => dispatch(push(urls.home())),
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(Welcome);
