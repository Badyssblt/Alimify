// @ts-ignore
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FoodsController {
  async create({ request, response, auth }: HttpContextContract){
    const payload = await request.validateUsing()
  }
}
