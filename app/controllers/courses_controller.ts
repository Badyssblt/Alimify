// @ts-ignore
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from '#models/course'

export default class CoursesController {
  async create({ auth, request, response }: HttpContextContract){
    const payload = request.all();

    return payload;

    const course = await user.related('courses').create({
      ...payload,
    })

    return response.created(course);
  }
}
