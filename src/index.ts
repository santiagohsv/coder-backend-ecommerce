import express from 'express';  
import session from 'express-session';

import mainRouter from './routes/index';
import env from './config/index'
import sessionConfig from './services/sessions';

const app = express();
const PORT = env.PORT || 8080;

app.use(express.json());
app.use(session(sessionConfig))

app.use('/',mainRouter )

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}/`)
});
