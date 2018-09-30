# connectingUs

Rules
Naming Rules
In general aspect we use dash-separated names and all in lowercase. When the name has a anagram, the uppercase is allowed. Ex:

 this-is-a-javascript.js
 and-this-a-html.html
There are some rules for naming files:

Services
Module folder's name + 'srv' + '.js' For example: 'book-srv.js'

Controllers
Module folder's name + Name of component + 'con' + '.js' For example: 'book-grid-con.js'

The controller name inside the file, should be in UpperCamelCase. For Example: 'BooksController'.

For country specific case, add the country code (ex. us) between "Name of component" and "con". For Example: 'book-grid-us-con.js'

In the name inside the file, add the country code (ex. Us) before "Controller". For Example: 'BooksUsController'.

Templates
Module folder's name + Name of template + '.html' For example: 'book-grid.html'

For country specific case, add the country code (ex. us) between "Name of template" and ".html". For Example: 'book-grid-us.html'

Modules files
These files should always be called 'modules.json'

Route names
The routes name must start with a / and separates terms with / also.

For country specific case, add the country code (ex. us) at the end of the name. For Example: '/books/us'

Mocking files
Module folder's name (starting with lowcase) + 'mck' + '.js' For example: 'book-mck.js'

Test files
Module folder's name + Name of component + 'con' + '_test' + '.js' For example: 'book-grid-con_test.js'

Translations.

Go to the app-config.js and create a new object with the culture translations if it not exists.
If exists, create a new property with the module or inside the property of the module that you need add translations.
Then, use "translate="THE_FIELD" if you want to use as binding or {'THE_FIELD' | translate} on the value. 