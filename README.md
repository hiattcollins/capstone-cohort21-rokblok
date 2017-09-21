# RokBlok - NSS Cohort 21 Front-End Capstone

RokBlok is a facebook-linked web app that gathers into one place all concerts by bands and musicians the user has liked on facebook.  Although facebook has features that allow users to see local music events, it doesn't provide a way to narrow events to just those acts the user has liked. RokBlok provides a focused list of shows based on the user's likes and permits sorting and searching in different ways.  RokBlok also allows a user to save events they are interested in, and stores that information outside of facebook.

### Features

RokBlok provides:
*Sorting the list of upcoming events by time or band name
*Searching the list of upcoming events by city name or band name
*Saving events that interest the user, or deleting events that have passed or are no longer of interest.

### Technologies Used

* [AngularJS](https://angularjs.org/) - The web framework used
* [Materialize](http://materializecss.com/) - Styling and UX
* [Bootstrap](http://getbootstrap.com/) - Otional styling and UX
* [jQuery](https://jquery.com/) - Additional javascript functionality
* [Grunt](https://gruntjs.com/) - Javascript task runner
* [Firebase](https://firebase.google.com/) - Data storage
* [Angular-EasyFB](https://www.npmjs.com/package/angular-easyfb) - Handles interaction between AngularJS and Facebook

### API

The API used in this app is facebook's [Graph API](https://developers.facebook.com/docs/graph-api/), which allows access to data from users, pages, events, etc.  Information on integrating facebook into javascript-based web apps may be found on [facebook for developers](https://developers.facebook.com/docs/javascript).


## Getting Started

In order to use this app, you'll need to set up an application on facebook's [developer page](https://developers.facebook.com/) and on [Firebase](https://firebase.google.com/).

### Installing

The dependencies for this project are found in the package.json file in the Github repository.  Use npm install in the lib folder in order to install these.  In addition, install angular-easyfb following the instructions [here](https://www.npmjs.com/package/angular-easyfb).


## Deployment

TBD


## Author

* **Hiatt Collins** - [hiattcollins](https://github.com/hiattcollins) on Github
