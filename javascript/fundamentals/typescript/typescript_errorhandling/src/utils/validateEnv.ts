import {
   cleanEnv, str,
} from 'envalid'

function validateEnv() {
   cleanEnv(process.env, {
      MONGO_PATH: str(),
      // PORT: 5000
   })
}

export default validateEnv