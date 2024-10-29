/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import Course from '#models/course'
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
    router.get('/', [CoursesController, 'getCollection'])
    router.get('/:id', [CoursesController, 'get'])
    router.delete('/:id', [CoursesController, "delete"])
  })
  .prefix('/api/courses')

// Groupe pour les aliments
router
  .group(() => {
    router.get('/', [FoodsController, 'index'])
    router.post('/', [FoodsController, 'create'])
    router.get('/:id', [FoodsController, 'show'])
    router.patch('/:id', [FoodsController, 'update'])
    router.get('/:barCode/course', [FoodsController, 'isInCourse'])
    router.delete('/:id', [FoodsController, 'delete'])
  })
  .prefix('/api/foods')
