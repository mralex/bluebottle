# Perfectly Ground Work Orders

# Architecture

## Backend

* DB schema defines a Coffee table, providing us with coffee names;
  And an Order table, with the required properties, and backend constraints to ensure we
  always get the most correct inputs, and provide us with appropriate errors when not.

* An OrderController acts as a surrogate to provide us with a view, a root url, and a way
  to pass in all the coffee data to the react app.

* A simple API at `/api/orders` gives the React app access to CRUD actions on work orders.
  The API is paginated via the Kaminari gem; and sanitized using ActiveModelSerializers.

## Frontend

* The app runs as a Single Page App, with a smart component maintaining all of the application
  state (app/javascript/pages/work_orders). This component coordinates page loading, data
  loading/saving, via callbacks from the other components.

* The order modal leverages ReactDayPicker for date picking.

* The order modal will default to creating a new, blank, order; unless it's passed an existing
  order as a prop, where it'll replace the default stateful one with a copy of the prop version.

* Updated orders will optimistically update the data store on save, and fully replaced once
  the AJAX call to the API completes.

* Extenstive use of CSS Modules throughout, which only needed a minor configuration change to
  enable in `config/webpack/environment.js`. These allow us to have CSS classes included directly
  to where they're being used, without having to write styles in JS; or include a large stylesheet
  where component styles may get orphaned over time; or fear naming collisions and weird
  cascading side effects.

  Standard CSS classes from the global `application.css` can still be used as necessary for
  generic styles (i.e., `.btn`, the grid, etc).


# Trade offs

* The brew method is stored as an enum in the model, which gives us a nice way to access
  the information. This could have been stored as a reference to another table, but at
  this stage in iteration that would probably be overkill. Since the values are stored
  as integers in the table, migrating to a foreign key relationship later wouldn't be too
  much work.

* For the interests of time, the core WorkOrders React component will request fresh API data
  every time the user clicks on the pagination buttons. The code is angled toward caching that
  data, and would be a concern in a production environment, but for the sake of making order
  changes, and creating new orders quickly, the data gets reloaded.

* While not super familiar with using Jest/Enzyme, I did manage to get it setup and working
  for a couple components in the app. Given more time, I'd add more test coverage.


# Running the code

Requires Ruby 2.5.1 to be installed, along with a recent version of Postgresql and Node.js.

$ bundle
$ yarn
$ rails db:setup # Will create the dev and test dbs, load the schema,
                   and initialize with some test seed data

$ rails s

After it boots up Puma, navigate to http://localhost:3000

## Testing

Run RSpec tests:
  $ rspec

Run Jest/Enzyme tests:
  $ npm test


# Deployment

* Can be pushed directly to Heroku for basic testing (demo: http://floating-depths-93049.herokuapp.com/)
* With the addition of a Capfile it could be easily made to be deployed via Capistrano
* Additional work can be done to deploy to Docker if we added a suitable Dockerfile and potentially docker-compose.yml depending on hosting strategy. Kubenetes, etc is a bit out of scope for this example.
