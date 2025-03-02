import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express();

const PORT = 3000 || process.env.PORT

app.use(express.json());
app.use(cors()); // access the backed from an ip

app.get('/', (req, res) => {
    res.send('API WORKING');
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})