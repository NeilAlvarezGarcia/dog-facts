const express = require("express");

// Setting up the application
const app = express();
app.use(express.static('public'));
const port = process.env.PORT || 3000;

// Setting the routes
app.get('/api/v1/random/dog', async (_req, res) => {
    try {
        const imageDog = await (await fetch('https://dog.ceo/api/breeds/image/random')).json();
        if (imageDog.status !== 'success') {
            throw new Error('Error fetching the dog image.')
        }

        const dogFacts = await (await fetch('https://dog-api.kinduff.com/api/facts?number=5')).json();
        if (!dogFacts.success) {
            throw new Error('Error fetching the dog facts.')
        }

        res.status(200).json({
            status: 'success',
            data: {
                img: imageDog.message,
                facts: dogFacts.facts
            }
        });
    } catch(err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            message: 'Ocurred an error on the server, Come back later.'
        });
    }
});

// Setting a page not found
app.use((_req, res) => {
    res.status(404).write(`
        <p>This page does not exist<p>
        <a href='/'>Go back to main page</a>
    `)
    res.end();
})

// Setting the port and raising up the application
app.listen(port, () => {
    console.log('server is runing successfuly in port ' + port);
});
