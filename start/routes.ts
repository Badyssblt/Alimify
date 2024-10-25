/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const FoodsController = () => import('#controllers/foods_controller')

router.get('foods', [FoodsController, 'index'])
