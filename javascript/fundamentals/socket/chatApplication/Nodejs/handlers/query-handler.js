registerUser(data){
   return new Promise(async (resolve, reject) => {
      try {
         const [DB, ObjectId] = await this.MongoDb.onConnect()
         DB.collection('users').insertOne(data, (err, result) => {
            DB.close()
            if (err) {
               reject(err)
            }
            resolve(result)
         })
      } catch (error) {
         reject(error)
      }
   })
}