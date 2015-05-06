# prerender
Render external html files into static file using the body tag.

# file system cache
Every file is stored locally fully and after we create templates per file. Using soket.io the user is able to render the new template. For each user a unique list of templates is created.

# install
````sh
git clone git@github.com:dmartz86/prerender.git
cd prerender
npm install
node app.js
````

# garbage collector
Run the app and clean files from public/tmp and public/templates
````sh
node app
````

# test with protractor

````sh
npm test
````
