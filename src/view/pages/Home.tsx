import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

interface DispatchProps {
  gotoWelcome: () => void;
}

type Props = DispatchProps;

class Home extends React.Component<Props> {
  render() {
    const { gotoWelcome } = this.props;
    return (
      <div>
        <h1>home page</h1>
        <button onClick={gotoWelcome}>go to welcome</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  gotoWelcome: () => dispatch(push('/')),
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(Home);
