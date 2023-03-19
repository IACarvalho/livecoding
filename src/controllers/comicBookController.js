import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from "../databaseConfig.js";

export async function comicBookController(app) {

  app.get('/', async ( _, reply) => {
  
    const users = await knex('comic_books').select('*')

    return reply.send({users})
  })

  app.get('/:id', async (request, reply) => {
    
    const getComicBookParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getComicBookParamsSchema.parse(request.params)

    const user = await knex('comic_books').where({id}).first()

    return reply.status(200).send({user})
  })

  app.post('/', async (request, reply) => {
    const createComicBookBodySchema = z.object({
      title: z.string(),
      issue_number: z.string().default(null),
      writer: z.string(),
      artist: z.string(),
      publisher: z.string(),
      gender: z.string(),
      cover_image_url: z.string().default(null)
    })

    const { title,
      issue_number,
      writer,
      artist,
      publisher,
      gender,
      cover_image_url 
    } = createComicBookBodySchema.parse(request.body)

    await knex('comic_books')
      .insert({
        id: randomUUID(),
        title,
        issue_number,
        writer,
        artist,
        publisher,
        gender,
        cover_image_url
      })

    return reply.status(201).send()
  })

  app.put('/:id', async (request, reply) => {
    
    const getComicBookParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const createComicBookBodySchema = z.object({
      title: z.string(),
      issue_number: z.string().default(null),
      writer: z.string(),
      artist: z.string(),
      publisher: z.string(),
      gender: z.string(),
      cover_image_url: z.string().default(null)
    })

    const { id } = getComicBookParamsSchema.parse(request.params)

    const { title,
      issue_number,
      writer,
      artist,
      publisher,
      gender,
      cover_image_url 
    } = createComicBookBodySchema.parse(request.body)

    await knex('comic_books')
      .where({id})
      .update({
        title,
        issue_number,
        writer,
        artist,
        publisher,
        gender,
        cover_image_url
      })

    await knex('comic_books').where({id}).first()

    return reply.status(204).send()
  })

  app.delete('/:id', async (request, reply) => {
    const getComicBookParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getComicBookParamsSchema.parse(request.params)

    await knex('comic_books').where({id}).del()

    return reply.status(204).send()
  })
}
