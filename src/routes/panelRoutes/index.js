import express from 'express';
import Controller from '../../controllers/panelController';

/*eslint-disable */
const router = express.Router();
/*eslint-enable */
const controller = new Controller();
const identiyId = 'panelId';
const userId = 1;

router.get('/', (req, res) => {
  controller
    .list()
    .then(data => {
      res.json({
        status: true,
        data,
      });
    })
    .catch(error => {
      res.json({
        status: false,
        error,
      });
    });
});

router.get(`/:${identiyId}`, (req, res) => {
  controller
    .get(req.params[identiyId])
    .then(data => {
      res.json({
        status: true,
        data,
      });
    })
    .catch(error => {
      res.json({
        status: false,
        error,
      });
    });
});

router.post('/', (req, res) => {
  controller
    .save(userId, req.body, req.files)
    .then(data => {
      res.json({
        status: true,
        data,
      });
    })
    .catch(error => {
      res.json({
        status: false,
        error,
      });
    });
});

router.put(`/:${identiyId}`, (req, res) => {
  controller
    .update(req.params.locationId, req.body)
    .then(data => {
      res.json({
        status: true,
        data,
      });
    })
    .catch(error => {
      res.json({
        status: false,
        error,
      });
    });
});

router.delete(`/:${identiyId}`, (req, res) => {
  controller
    .delete(req.params.locationId, req.body)
    .then(data => {
      res.json({
        status: true,
        data,
      });
    })
    .catch(error => {
      res.json({
        status: false,
        error,
      });
    });
});

export default router;
