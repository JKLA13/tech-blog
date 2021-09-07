// auth function, if user is not logged in redirect
//if logged in, then next route
const withAuth = (req, res, next) => {
  if (!req.sesssion.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
