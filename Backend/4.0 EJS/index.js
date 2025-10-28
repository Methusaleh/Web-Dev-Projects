import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    // console.log(dayOfWeek);
    let type = "a weekday";
    let adv = "it's time to work hard!";

    if (dayOfWeek === 0 || dayOfWeek === 6) {
        type = "the weekend";
        adv = "you deserve to relax!";
    }

    res.render('index.ejs', {
        dayType: type,
        advice: adv
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});