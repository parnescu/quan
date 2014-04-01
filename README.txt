i) technologies used:
- backend: nodejs with express and jade
- frontend: backbone with underscore,jquery and requirejs
- additional tools: bower.io component installer and gruntjs task manager



ii) project folders overview
+---- materials
+---public
¦   +---build
¦   +---css
¦   +---js
¦   ¦   +---controller
¦   ¦   +---models
¦   ¦   +---utils
¦   ¦   +---views
¦   ¦   +---_specs
¦   +---resources
+---routes
+---views

> materials:
  - contains initial pdf and json data file
  - also contains a screenshot of the working project

> routes:
  - contains nodejs path controller

> views:
  - contains the .jade templates for each page (main and jasmine specs runner page)

> public:
 - contains the actual project files 
	> js:		is where the full code resides
	> build:	is whre the grunt task compiles the project
	the rest of the folders are self explanatory...


iii) root files
 => bower.json -- bower configuration that tells what libs to install (backbone,underscore, jquery, jasmine)
 => compile.bat -- windows shortcut file that launches bower task (alternate command for mac: bower compile)
 => Gruntfile.js -- gruntjs config file that compiles the project into /public/build/* files
 => install.bat -- windows shortcut file that installs dependencies and starts the local server (alternate command for mac: npm start && npm install)
 => server.js -- nodejs server configuration file, gets run after install is finished




I've used nodejs with express and jade for the back-end, backbone with jquery and requirejs in the front-end and some additional tools for installing and minifying assets. I've also chosen to do the project using the TDD approach with jasmine.

The entry point to the test is install.bat on windows, or on a mac (just go to terminal in the project folder and launch npm install && npm start). You will need to have nodejs installed on your computer of course.

There's a readme.txt file in the root of the project that explains a little bit more what and where.
After everything is installed there should be message in the command line saying "SERVER:: init". You can now open up a browser window to 'localhost:3002' for the project itself, or 'localhost:3002/_tests' for the jasmine specs runner page. If by any chance you're unable to start this up, there's also an online version of the compiled project at: http://178.21.122.2/demo/quan. This uses the minified version of the code, but the full compiled code is available at http://178.21.122.2/demo/quan/quantemplate.js.

To browse thru the actual code go to /public/js/ folder, quanTemplate.js is the main module for the project. I hope it's not a problem that I used the requirejs library... coming from a strong actionscript background, I'm used to have my code neatly separated into distinct classes in different files and requirejs allows me to do just that, and since requirejs is just an aditional 14k to the file size, I always use it.

I'm quite pleased with how the project turned up, even though there are some things that can be tweaked or improved (it always seems like there's somthing I'd like to change in my code).
I sent the test now because from tomorrow on I'll be out of the city and won't be in for another week or so. Hope the resulting SPA and my code is yo your liking.

If there are any questions or issues with this you know where to find me.