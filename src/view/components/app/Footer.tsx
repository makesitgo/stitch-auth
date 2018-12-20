import React from 'react';
import classNames from 'classnames';
import { Alert } from '../../../state';

interface Props {
  working: boolean;
  alerts: Alert[];
  ackAlert: () => void;
}

class Footer extends React.Component<Props> {
  componentDidUpdate({ alerts: prevAlerts }: Props) {
    const { alerts, ackAlert } = this.props;

    const prevAlert = nextAlert(prevAlerts);
    const alert = nextAlert(alerts);

    if (prevAlert && alert && prevAlert.time === alert.time) {
      return;
    }

    setTimeout(ackAlert, 6000);
  }

  render() {
    const { alerts, working } = this.props;
    const alert = nextAlert(alerts);
    return (
      <div
        className={classNames(
          'footer',
          alert && {
            'footer-success': alert.type === 'success',
            'footer-info': alert.type === 'info',
            'footer-warn': alert.type === 'warn',
            'footer-error': alert.type === 'error',
            'footer-debug': alert.type === 'debug',
          }
        )}
      >
        {working ? (
          <p>working...</p>
        ) : alert ? (
          <div className="footer-alert">
            <p className="footer-alert-timestamp">{alert.time}</p>
            <p>{alert.message}</p>
          </div>
        ) : (
          <p>
            check out the{' '}
            <a href="https://github.com/makesitgo/stitch-auth" target="_blank" rel="noopener noreferrer">
              source code.
            </a>
          </p>
        )}
        {!alert && (
          <p>
            powered by{' '}
            <a href="https://docs.mongodb.com/stitch/" target="_blank" rel="noopener noreferrer">
              mongodb stitch.
            </a>
          </p>
        )}
      </div>
    );
  }
}

const nextAlert = (alerts: Alert[]) => {
  const count = alerts.length;
  if (count === 0) {
    return;
  }
  return alerts[count - 1];
};

export default Footer;
