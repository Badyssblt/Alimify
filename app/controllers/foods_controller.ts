// import type { HttpContext } from '@adonisjs/core/http'

export default class FoodsController {
  index() {
    return {
      message: 'Voici vos aliments',
    }
  }
}
