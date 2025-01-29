const passport = require('../passport/paaport');

exports.authGoogle = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, (err, user, info) => {
      if (err) {
          console.error('Authentication error:', err);
          return next(err);
      }

      // Log authentication info if available
      if (info) {
          console.log('Auth info:', { message: info.message });
      }

      if (!user) {
          req.flash('error', 'Authentication failed');
          return res.redirect('/login');
      }

      req.login(user, (loginErr) => {
          if (loginErr) {
              console.error('Login error:', loginErr);
              return next(loginErr);
          }

          // Authentication successful
          console.log('Authentication successful for user:', user.id);
          req.flash('success', 'Login successful!');
          res.redirect('/');
      });
  })(req, res, next);
}; 