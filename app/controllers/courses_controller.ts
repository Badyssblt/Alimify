// @ts-ignore
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from '#models/course'

export default class CoursesController {
  async create({ auth, request, response }: HttpContextContract){
    const payload = request.all();

    const user = await auth.authenticate()

    const course = await user.related('courses').create({
      userId: user.id,
      ...payload,
    })

    return response.created(course);
  }

  async getCollection({ auth }: HttpContextContract){
    const user = await auth.authenticate();

    return await user.related("courses").query();

  }

  async get({ request, auth, response }: HttpContextContract){
    const user = await auth.authenticate();

    try {
      const course = await Course.find(request.param('id'));
      if(course?.userId === user.id){
        await course?.load('foods')
        return course
      }
      return response.unauthorized();
    }catch (e) {
      return response.unauthorized();
    }




  }
}
