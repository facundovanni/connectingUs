# connectingUs

Rules
Naming Rules
In general aspect we use dash-separated names and all in lowercase. When the name has a anagram, the uppercase is allowed. Ex:
 this-is-a-javascript.js
 and-this-a-html.html

There are some rules for naming files:

Services
Module folder's name + 'srv' + '.js' For example: 'service-srv.js'

Controllers
Module folder's name + Name of component + 'con' + '.js' For example: 'service-crud-con.js'

The controller name inside the file, should be in UpperCamelCase. For Example: 'ServicesController'.

Templates
Module folder's name + Name of template + '.html' For example: 'service-grid.html'

Route names
The routes name must start with a /.
Module folder's name + 'config + '.js' For example: 'service-config.js'
And set it in
App-config.js

Translations.

Go to the app-config.js and create a new object with the culture translations if it not exists.
If exists, create a new property with the module or inside the property of the module that you need add translations.
Then, use "translate="THE_FIELD" if you want to use as binding or {'THE_FIELD' | translate} on the value.
