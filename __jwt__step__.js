/**
 * install jsonwebtoken
 * 
 * jwt.sign (payload, secret, {expiresIn: ''})
 * 
 * token client
 * 
 * */



/**
 * how to store token in the client side
 * 
 * 1. memory
 * 
 * 2. local storage
 * 
 * 3. cookie: http only (xss)
 * 
 * */


/**
 * 
 * 1. set cookies with http only. for development secure: false
 * 
 * 2. cors
 * app.use(cors({
    origin: ['http://localhost:5173/'],  //for production we have to change it
    credentials: true
}));
 * 
 * 3. client side axios setting
 * in axios set  withCredentials: true
 *  
 * */ 