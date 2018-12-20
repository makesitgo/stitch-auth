import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { urls } from '../../utils';
import { AppState, TestDocument, testFind } from '../../state';

interface StateProps {
  docs: TestDocument[];
}

interface DispatchProps {
  gotoWelcome: () => void;
  testFind: () => void;
}

type Props = StateProps & DispatchProps;

class Home extends React.Component<Props> {
  render() {
    const { docs, gotoWelcome, testFind } = this.props;
    console.log('encuentra!');
    return (
      <div className="home">
        <h1>home page</h1>
        <div className="home-controls">
          <h2>test documents:</h2>
          <pre>{JSON.stringify(docs, null, 2)}</pre>
          <button onClick={testFind}>refresh</button>
        </div>
        <button onClick={gotoWelcome}>go to welcome</button>
      </div>
    );
  }
}

const mapStateToProps = ({ test }: AppState) => ({
  docs: test.docs,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  gotoWelcome: () => dispatch(push(urls.welcome())),
  testFind: () => dispatch<any>(testFind.action()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
