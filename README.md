# Interview Scheduler

## Summary

Interview Scheduler is an interactive full-stack application built with Node and Express on the back-end, and React on the front-end. Modern hooks such as useState, useEffect, useReducer, and custom hooks are used to manage state and rendering.

Users can select which day they wish to make an appointment in, and create or edit an interview appointment by entering their name and selecting an interviewer. If no name is entered or no interviewer is selected, the appointment cannot be made. Users can also delete appointments they have made, after a confirmation message is given. Spots remaining for each day are dynamically updated as interview appointments are created/deleted.

This project uses CircleCI for a continuous integration pipeline, Heroku for hosting the back-end API server, and Netlify for serving the client-side. You can view this [Here](https://subtle-fenglisu-22a425.netlify.app/)

Requests from the Netlify app to the Heroku server are currently not working.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Express Server

Clone the API server [Here](https://github.com/wescorner/scheduler-api)

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Test Suite

```sh
npm run cypress
```

## Interview-Scheduler in action!

![create-appointment](https://github.com/wescorner/interview-scheduler/blob/master/images/create-appointment.gif)
![delete-appointment](https://github.com/wescorner/interview-scheduler/blob/master/images/delete-appointment.gif)
![edit-appointment](https://github.com/wescorner/interview-scheduler/blob/master/images/edit-appointment.gif)
![error-messages](https://github.com/wescorner/interview-scheduler/blob/master/images/error-messages.gif)
