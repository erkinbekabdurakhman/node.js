const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    res.send('<ul><li>Erkinbek</li><li>Carl</li></ul>');
    next();
})
app.use('/', (req, res, next) => {
    res.send('<h1>Here is users page</h1>')
}) 
app.listen(3002);

