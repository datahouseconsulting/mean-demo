mean-demo
=========

Simple demo using Mongodb, Express, AngularJs, and NodeJs


Steps to get started:

1. Download and install NodeJS

  http://nodejs.org/


2. Install ExpressJs from NPM
  (Main NPM site: https://www.npmjs.org/)

  From this directory (mean-demo), type from a command prompt:

  npm install express

  You will now have a folder named "node_modules in this directory"
  This will contain all of the node modules that you "install"


3. Create a server.js file in your mean-demo directory
  This will be the code for the node webserver that you will be running

  server.js:
  --------------

  /**
   * Module dependencies.
   */
  var express = require('express');
  var path = require('path');


  // Create a new express object that becomes our webserver
  var app = express();

  // line that will make any request to the server point to the public directory
  app.use(express.static(path.join(__dirname, 'public')));


  //Start the app by listening on port 8000
  app.listen(8000);

  // display output so that we know the server was started successfully
  console.log('Express app started on port 8000');

  -----------


4. Create an index.html file in a public folder
   (This will be the first web page that your server will serve up)

   Put something in it like "Hello World"


5. Run your webserver

   From this directory (mean-demo), type from a command prompt:

   node server.js

   (This will run your server.js code and basically start up your server)

   Go to 127.0.0.1:8000/index.html to see your page


6. Download bootstrap and add it to your app

  http://getbootstrap.com/

  Two choices:
  1. download it and put it into a folder in your app,
  2. reference the cdn directly from your page

  1. pros - you always have it even if the user cant access the bootstrap page, they only get it from one place
  2. pros - its possible for it to be cached and slightly faster to retrieve on the initial load

  For now, we will use the CDNs:

  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">

  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

  Special note: A lot of boostrap's js uses Jquery to work.
  Download or reference jquery as well - The Jquery library has to be in front of the bootstrap js reference
  ORDER MATTERS

    <!-- Jquery minified Javascript -->
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>


7. Play around and add bootstrap elements
  Maybe an icon:
  (choose from http://getbootstrap.com/components/)

  <span class="glyphicon glyphicon-search"></span>

  or maybe a button group:

  <!-- Single button -->
  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      Action <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu">
      <li><a href="#">Action</a></li>
      <li><a href="#">Another action</a></li>
      <li><a href="#">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="#">Separated link</a></li>
    </ul>
  </div>
























