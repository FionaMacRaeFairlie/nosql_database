
// app.js (ES Modules)

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import router from './routes/studentSearchRoutes.js';

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Serve Bootstrap CSS from node_modules
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

// Mustache template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

// Routes
app.use('/', router);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

