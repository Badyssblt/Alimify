// @ts-ignore
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from '#models/course'

type CourseType = {
  id: number,
  userId: number,
  price: number,
  createdAt: Date,
  updatedAt: Date,
  foodsCount: number
}

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

  async getCollection({ auth }: HttpContextContract) {
    const user = await auth.authenticate();

    const courses = await user.related('courses').query().withCount('foods').orderBy('createdAt', 'desc');

    return courses.map((course: CourseType) => ({
      id: course.id,
      userId: course.userId,
      price: course.price,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      foodsCount: course.$extras.foods_count
    }));
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
  async delete({ request, auth, response }: HttpContextContract) {
    const user = await auth.authenticate();
    const courseId = request.param('id');

    try {
      const course = await Course.find(courseId);

      if (!course) {
        return response.notFound({ message: 'Course not found' });
      }

      if (course.userId !== user.id) {
        return response.unauthorized({ message: 'You are not authorized to delete this course' });
      }

      await course.delete(); // Supprimer le cours
      return response.noContent(); // Répondre avec un statut 204 No Content
    } catch (error) {
      return response.internalServerError({ message: 'An error occurred while trying to delete the course' });
    }
  }
}
