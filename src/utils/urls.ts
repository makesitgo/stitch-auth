export const urls = {
  welcome: () => '/',
  login: () => '/login',
  register: () => '/register',
  confirmationEmail: () => '/emails/confirmation',
  passwordResetEmail: () => '/emails/password_reset',
  confirmEmail: () => '/confirm_email',
  resetPassword: () => '/reset_password',
  waitingRoom: () => ({
    route: () => '/waiting_room/:emailTopic',
    confirmationEmail: () => '/waiting_room/confirmation',
    passwordResetEmail: () => '/waiting_room/password_reset',
  }),
  home: () => '/home',
};
