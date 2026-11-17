export const successResponse = (res,statusCode = 200, message ="Success",data = null) =>{
    const respone = {
        success : true,
        message
    }
    if(data){
        respone.data = data;
    }

    return res.status(statusCode).json({respone});
}
export const errorResponse = (res,statusCode = 500, message ="Internal server error",error = null) =>{
    const respone = {
        success : false,
        message
    }
    if(error){
        respone.error = error.message;
    }

    return res.status(statusCode).json(respone);
}