import { config } from 'dotenv'
config()

export const SENDGRID_API = process.env.SEND_API
export const HOST_EMAIL = process.env.HOST_EMAIL
export const DOMAIN = process.env.APP_DOMAIN
