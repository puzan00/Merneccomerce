// dev.js
import app from './api/server.js';

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Local server running at http://localhost:${port}`);
});
