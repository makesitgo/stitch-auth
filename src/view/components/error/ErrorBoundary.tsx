import React from 'react';

interface State {
  err?: Error;
}

class ErrorBoundary extends React.Component<{}, State> {
  state: State = {};

  componentDidCatch(err: Error, info: Object): void {
    this.setState(() => ({ err }));
    console.log(info);
    console.log(`caught error: ${JSON.stringify(err)}`);
  }

  render() {
    const { children } = this.props;

    if (this.state.err) {
      const { err } = this.state;
      return (
        <div>
          <h1>Oops...something bad happened</h1>
          <p>
            Try refreshing the page. If the problem persists, then we are already aware of this issue. Hang tight!
          </p>
          <hr />
          <div>
            <h5>{err.name}</h5>
            <pre>{err.message}</pre>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
