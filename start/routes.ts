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
const UsersController = () => import('#controllers/users_controller')
const CoursesController = () => import('#controllers/courses_controller')

// Groupe pour les utilisateurs
router
  .group(() => {
    router.post('/', [UsersController, 'register']) // Inscription
    router.post('/login', [UsersController, 'login']) // Connexion
  })
  .prefix('/api/users')

// Groupe pour les courses
router
  .group(() => {
    router.post('/', [CoursesController, 'create'])
    router.get('/', [CoursesController, 'index'])
    router.get('/:id', [CoursesController, 'show'])
  })
  .prefix('/api/courses')

// Groupe pour les aliments
router
  .group(() => {
    router.get('/', [FoodsController, 'index'])
    router.post('/', [FoodsController, 'create'])
    router.get('/:id', [FoodsController, 'show'])
  })
  .prefix('/api/foods')
