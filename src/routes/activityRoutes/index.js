import express from 'express';
import ActivityController from '../../controllers/activityController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new ActivityController();
const identiyId = 'activityId';

router.get('/', (req, res) => {
  controller
    .list(req.params)
    .then((data) => {
      res.json({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

router.get(`/:${identiyId}`, (req, res) => {
  controller
    .get(req.params[identiyId])
    .then((data) => {
      res.json({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

router.post('/', (req, res) => {
  controller
    .save(req.body)
    .then((data) => {
      res.json({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

router.put(`/:${identiyId}`, (req, res) => {
  controller
    .update(req.params[identiyId], req.body)
    .then((data) => {
      res.json({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

router.delete(`/:${identiyId}`, (req, res) => {
  controller
    .delete(req.params[identiyId], req.body)
    .then((data) => {
      res.json({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

export default router;
