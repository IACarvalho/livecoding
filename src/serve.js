import Fastify from 'fastify'
import { comicBookController } from './controllers/comicBookController.js'

const app = Fastify({
  logger: true
})

app.register(comicBookController, {
  prefix: 'comic_book'
})

app.listen({ port: 3333}, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
