## Quizzy

### What is this?

It is a quiz app that I developed for my college. The admin can post quizzes on certain topics and the users can take the quiz and analyze their performance over time.

### Where can I see this?

You can visit this website by clicking [here](https://quizzy-iiitk.herokuapp.com/).

### How to run this locally?

* Clone this repository.

#### Setting up Environment Variables

* Create a file called `variables.env` in the root directory. Provide the values for following keys -
```
DATABASE=YOUR_VALUE
GOOGLE_CLIENT_ID=YOUR_VALUE
GOOGLE_CLIENT_SECRET=YOUR_VALUE
COOKIE_KEY=YOUR_VALUE
```

#### Installing dependencies

* `npm install`
* `npm run client-install`

#### Running both client and server
* `npm run dev`
