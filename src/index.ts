import express from 'express';  
import mainRouter from './routes/index';
import env from './config/index'

const app = express();
const PORT = env.PORT || 8080;

app.use(express.json());
app.use('/',mainRouter )

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}/`)
});
