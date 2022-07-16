async registerRouteHandler(request, response){
   const data = {
      username: (request.body.username).toLowerCase()
      password: request.body.password
   }

   if (data.username === '') {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
         error: true,
         message: CONSTANTS.USERNAME_NOT_FOUND
      });
   } else if (data.password === '') {
      response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
         error: true,
         message: CONSTANTS.PASSWORD_NOT_FOUND
      });
   } else {
      try {
         data.online = 'Y'
         data.socketId = ''

         data.password = passwordHash.createHash(data.password)

         const result = await helper.registerUser(data)
         if (result === null || result === undefined) {
            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
               error: false,
               message: CONSTANTS.USER_REGISTRATION_FAILED
            });
         } else {
            response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
               error: false,
               userId: result.insertedId,
               message: CONSTANTS.USER_REGISTRATION_OK
            });
         }
      } catch (error) {
         response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.SERVER_ERROR_MESSAGE
         });
      }
   }
}