/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import MongoUtil from 'util-mongodb';
import _ from 'lodash';

import FileUtil from '../../utils/fileUtil';

export default class PanelController {

  constructor() {
    this.mongoUtil = new MongoUtil();
    this.collectionName = 'panel';
    this.fileUtil = new FileUtil();
  }

  list() {
    const filter = {
      status: true,
    };
    const options = {
      sort: 'weight',
    };
    return this.mongoUtil.find(this.collectionName, filter, options);
  }

  get(entityId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(entityId),
      status: true,
    };
    return this.mongoUtil.findOne(this.collectionName, filter);
  }

  save(userId, data, files) {
    const newData = _.assign({}, JSON.parse(data.data), {
      status: true,
      created: new Date(),
      userId,
    });
    return this.fileUtil.save(files.file)
      .then((fileName) => {
        newData.realFile = fileName;
        return this.mongoUtil.insert(this.collectionName, newData);
      });
  }

  update(entityId, data) {
    const filter = {
      _id: this.mongoUtil.getObjectID(entityId),
    };
    const newData = _.assign({}, data, {
      updated: new Date(),
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }

  delete(entityId) {
    const filter = {
      _id: this.mongoUtil.getObjectID(entityId),
    };
    const newData = _.assign({}, {
      deleted: new Date(),
      status: false,
    });
    return this.mongoUtil.update(this.collectionName, newData, filter);
  }
}
