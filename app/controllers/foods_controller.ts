// @ts-ignore
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Food from '#models/food'
import Course from '#models/course'

export default class FoodsController {
  async create({ request, response, auth }: HttpContextContract) {
    const payload = request.only(['name', 'description', 'image', 'calory', 'nutriScore', 'quantity', 'barcode', 'courseId', 'barCode', 'price']);
    const user = await auth.authenticate();

    const course = await Course.find(payload.courseId);
    if (!course || course.userId !== user.id) {
      return response.unauthorized({ message: "You do not have access to this course." });
    }

    const existingFood = await course.related('foods').query().where('bar_code', payload.barCode).first();
    if (existingFood) {
      existingFood.quantity += payload.quantity;
      await existingFood.save();
      return response.ok(existingFood);
    } else {
      const newFood = await course.related('foods').create(payload);
      return response.created(newFood);
    }
  }
  async show({ params, response, auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const food = await Food.find(params.id);

    if (!food || (await food.related('course').query().where('userId', user.id).first()) === null) {
      return response.notFound({ message: "Food item not found or you don't have access." });
    }

    return response.ok(food);
  }
  async index({ response, auth }: HttpContextContract) {
    const user = await auth.authenticate();

    const courses = await user.related('courses').query().preload('foods');

    const courseCount = courses.length;

    const foods = courses.flatMap(course => course.foods);

    return response.ok({
      courseCount,
      foods,
    });
  }
  async update({ params, request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const food = await Food.find(params.id);

    if (!food || (await food.related('course').query().where('userId', user.id).first()) === null) {
      return response.notFound({ message: "Food item not found or you don't have access." });
    }

    const payload = request.only(['name', 'description', 'image', 'calory', 'nutriScore', 'quantity']);
    food.merge(payload);
    await food.save();

    return response.ok(food);
  }
  async delete({ params, response, auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const food = await Food.find(params.id);

    if (!food || (await food.related('course').query().where('userId', user.id).first()) === null) {
      return response.notFound({ message: "Food item not found or you don't have access." });
    }

    await food.delete();
    return response.noContent();
  }

  async isInCourse({ params, response, auth }: HttpContextContract){
    const user = await auth.authenticate();

    if(!user){
      return response.unauthorized();
    }

    const food = await Food.findBy('bar_code', params.barCode);

    return response.ok(food);
  }
}
