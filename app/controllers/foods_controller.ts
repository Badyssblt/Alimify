// @ts-ignore
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from '#models/course'

export default class FoodsController {
  async create({ request, response, auth }: HttpContextContract){
    const payload = await request.all();
    const user = await auth.authenticate();

    const courseId = payload.courseId

    const course = await Course.find(courseId)

    if(!course || course.userId !== user.id){
      return response.notFound();
    }

    return await course.related('foods').create({
      ...payload
    })




  }
}
