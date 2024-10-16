import env from './config/env'

import app from './app/index'

import dotenv from 'dotenv'

dotenv.config()

const port = env.port || '3000'
app.set('port', port)

app.listen(port, () => {
  console.log(`PayNest app listening on PORT:${port}`)
})
