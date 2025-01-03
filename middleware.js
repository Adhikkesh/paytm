export const authMiddleware = (authHeader) => {
    try{
        console.log(authHeader);
    }
    catch(err){
        throw err;
    }
}