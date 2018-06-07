##SETUP
0.) install Node.js v6.11.5
1.) install typescript
npm install typescript
2.) setup webpack
use older webpack version
'npm install -g webpack@3.12.0 --save'
3.) use ts-loader 3.5.0

4.) to use serve install
cd /usr/local/lib/
sudo npm install @google-cloud/functions-emulator
sudo npm install -g @google-cloud/functions-emulator

##DEPLOY
1.) Goto Functions folder
2.) type in 'webpack' to generate index.js
3.) 'sudo firebase serve --only hosting,functions' for local testing, 'firebase deploy' to send to firebase
