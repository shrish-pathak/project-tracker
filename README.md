[LIVE] (https://s-project-tracker.herokuapp.com)

# project description
 a small project to keep track of mini projects

# requirements
- [nodejs] (https://nodejs.org/en/download/)
- [mongoDB] (https://www.mongodb.com/try/download/community)

# steps to run the project

- clone this repo via this command:
- git clone https://github.com/shrish-pathak/project-tracker.git 
- create keys_dev.js file in /config folder
- add following lines in keys_dev.js
- > module.exports = {
  >     mongoURI:'mongodb://localhost:27017/projectTracker',
  >     secretKey:'anything'
  > }

- in /project-tracker run: npm install
- in /project-tracker/client run: npm install
- in /project-tracker/client run: npm start
- in /project-tracker run: npm start

- in case if you see any error make sure you are running your mongodb, command to run: mongod