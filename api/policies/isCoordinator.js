module.exports = function(req, res, next) {

    Logger.debug("Policy.isCoordinator");
  
    if(req.user){	
        if(req.user.hasOwnProperty("role")){
            if (req.user.role==2) {
                return next();
            }else {
              return res.send({ status: 403, message: 'You are not authorized to view this page or resource.' });
          }
        }else{
          // Return to login
          return res.send({ status: 401, message: 'Please login.' });
      }
    }else{
      // Return to login
      return res.send({ status: 401, message: 'Please login.' });
    }
  };
  