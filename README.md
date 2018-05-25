# Load monitoring application
![alt text](https://i.imgur.com/MXEf9hq.png)
This is a simple load monitoring app written in Vue.js. This repo serves as the code base for the client. 
# Installation
1. You must first [clone](https://github.com/adityajain15/uptimeMonitorServer) and run the server in order to make this app work. Instructions on how to do this are in the server repo
2. Clone this repo, go into the directory
3. Install dependencies using `npm install`
4. Run the server using `npm run serve`
5. Your app should be running at `localhost:8080`
# Testing
This repo implements some basic Mocha + Chai tests to test the logic behind the troubleshooting logs, in the case that the two-minute average crosses a certain threshold. To run these tests `npm run test`
# Architectural overview
This app relies on two Vue components 'Chart' and 'History' which as the names suggest, are the chart and history log respectively. Both of them rely on data that is stored in a Vuex store, seperating the data-storage and rendering concerns. We set up a `WebSocket` in `main.js` which dispatches a Vue action each time data is received.  
