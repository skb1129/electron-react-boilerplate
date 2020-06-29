# Electron React Boilerplate
A minimal boilerplate to start developing desktop apps using Electron and React.

## Getting Started
These instructions will help you run a copy of this project on your system.

### Requirements
You need the following application installed on your system to run this project.
- node ~12.18.1
- yarn ~1.22.0

### Installation
You can install the node dependencies required by the application with the following command:
```shell script
yarn install
```

### Development
To start the application in development mode run the following commands on separate terminal sessions.
```shell script
yarn start:renderer
```
This will start the renderer webpack-dev-server application.
```shell script
yarn start:main
``` 
This will start the main electron application.

### Production
Run the following command to start the application in production mode.
```shell script
yarn start
```

### Bundling
Run the following command to package the application.
```shell script
yarn package:macos     # MacOS
yarn package:windows   # Windows
yarn package:linux     # Linux
yarn package           # All platforms
```
The build executables will be available in the `dist/` directory. 

## Build With
* [React](https://reactjs.org/) - The frontend library used
* [Electron](https://www.electronjs.org/) - Cross platform desktop app framework
* [Webpack](https://webpack.js.org/) - Asset bundling tool

## Authors

* **Surya Kant Bansal** - *Initial work* - [skb1129](https://github.com/skb1129)
