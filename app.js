import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the subscription tracker API');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Subscription Tracker API is running on http://localhost:${port}`);
});


export default app;