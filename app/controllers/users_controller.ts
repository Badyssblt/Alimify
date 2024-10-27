// @ts-ignore
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '#models/user'
import { createUserValidator, loginValidator } from '#validators/user_validator'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  async register({ request }: HttpContextContract) {
    const payload = await request.validateUsing(createUserValidator)

    const password = await hash.make(payload.password)

    const user = await User.create({
      email: payload.email,
      password: password,
      name: payload.name,
    })

    if (user.$isPersisted) {
      return user
    }
  }
  async login({ request, response }: HttpContextContract) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.query().where('email', email).first()

    if (user && (await hash.verify(user.password, password))) {
      const token = await User.accessTokens.create(user)

      return response.ok({
        token,
        user: user.serialize(),
      })
    } else {
      return response.unauthorized('Invalid credentials')
    }
  }
}
