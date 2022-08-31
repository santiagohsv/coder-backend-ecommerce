import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {

  const data =  {
    os: process.platform,
    node: process.version,
    memory: process.memoryUsage().rss,
    path: process.cwd(),
    process_ID: process.pid,
  }
  
  res.render('info', data )
});

export default router;
