import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';



import pokemonRoute from './routes/pokemon.route.js';
const app = express();
const PORT = import.meta.url.PORT || 3000;



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// app.set('views', path.join(__dirname, 'views', 'pages'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
// Add this to your main server file (e.g., app.js or server.js)
app.use('/favicon.ico', (req, res) => res.status(204).end());



app.use(pokemonRoute);





app.listen(PORT,()=>{
    console.log('running on PORT ', PORT);
})