import express from 'express';
import bodyParser from 'body-parser';
import MongoUtil from 'util-mongodb';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

import panelRoutes from './routes/panelRoutes';
import config from './config';

const app = express();
const mongoUtil = new MongoUtil(config.get('db.url'));

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use('/docs', express.static('data'));
app.use(fileUpload());

app.use('/api/panel', panelRoutes);

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));

mongoUtil.openConnection()
  .then(() => {
    const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
      if (err) {
        console.log(err);
      }
      const host = server.address().address;
      const port = server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
    });
  }, () => {
    console.log('Error :: No DB connection open');
  });
