# GoSky Web Admin Website - React Project

GoSky is an airplane ticket ordering app. This team project is made as part of final challenge in Binar Academy - Fullstack Web Developer course. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Access
To access this app. You can use this default admin account:

        email: gosky.admin@gmail.com
        password: admin

## Routes
This project is hosted using vercel

| Name | Route | Full URL | Description |
|--|--|--|--|
| Landing Page | `/` | https://gosky-admin.vercel.app/ | Landing page for website. Redirect to login page if not logged in, go to dashboard if logged in. |
| Login Page | `/login` | https://gosky-admin.vercel.app/login | Login using GoSky admin account. |
| Dashboard | `/dashboard` | https://gosky-admin.vercel.app/dashboard | View last transactions and earning stats. |
| Transactions Page | `/dashboard/transactions` | https://gosky-admin.vercel.app/dashboard/transactions | View last transactions. |
| Manage Tickets Page | `/dashboard/tickets` | https://gosky-admin.vercel.app/dashboard/tickets | Manage tickets data. |
| Create Ticket Page | `/dashboard/tickets/create` | https://gosky-admin.vercel.app/dashboard/tickets/create | Add new ticket data. |
| Create Ticket Page | `/dashboard/tickets/update/:id` | https://gosky-admin.vercel.app/dashboard/tickets/update/:id | Edit existing ticket data. |

## Running The Application

Before running the app, first install all the dependencies needed by running:

    npm install

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Test Coverage

Test coverage of this app is only about 40%. This is because difficulty in making tests that needs to mock API fetch call and cookies.

![coverage](/docs/coverage.png)
