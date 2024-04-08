import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";
import { ensureAuth, ensureAuthByQuery } from "./middlewares/auth";
import { favoriteController } from "./controllers/favoriteController";
import { likesController } from "./controllers/likesController";
import { usersController } from "./controllers/usersController";

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/popular', ensureAuth, coursesController.popular)
router.get('/courses/:id', ensureAuth, coursesController.show)

router.get('/episodes/stream', ensureAuthByQuery, episodesController.stream)

router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchTime)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchTime)

router.get('/favorites', ensureAuth, favoriteController.view)
router.post('/favorites', ensureAuth, favoriteController.save)
router.delete('/favorites/:id', ensureAuth, favoriteController.remove)

router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.remove)

router.get('/users/current/watching', ensureAuth, usersController.watching)


export { router }