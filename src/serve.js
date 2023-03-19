import Fastify from 'fastify'

const app = Fastify({
  logger: true
})

app.get('/', (request, reply) => {
  return reply.send({ message: "Hello world!"})
})

app.listen({ port: 3333}, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
