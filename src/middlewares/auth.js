/*export const authorization = (role) =>{
    return(req, res, next) =>{
      console.log(req.user);
      if(!req.user){
        return res.status(401).send({ error: 'Unauthorized'});
      }
      if(req.user.user.role != role){
        return res.status(403).send({ error: 'Not permissions'})
      }
  
      next();
    }
  }*/

    export const authorization = (role) => (req, res, next) => {
      if (req.user.user.role === role) return next();
    
      res.status(401).send({ error: 'Unauthorized'});
    };