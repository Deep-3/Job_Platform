
// Middleware to check if NOT logged in
exports.isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};

// Middleware to check if logged in
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
     next();

   
};



exports.authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'Not logged in' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: 'You do not have permission to access this resource' 
            });
        }

        next();
    };
};