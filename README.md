# FlightSurety

FlightSurety is a sample application project for Udacity's Blockchain course.

## how to launch dapp:
```
npm install
npm run compile
npm run ganache
npm run migrate
npm run server
npm run dapp
```


`npm install`
`truffle compile`

## things to be careful:
you need to connect your browser with Metamask that listens to http://127.0.0.1:7545.  
I highly recommend Chrome browser that have installed Metamask.   
you can make sure that an insuree get paid 1.5 ether by checking out account balance in Metamask.   

## how to run unit test
`npm run ganache`
`npm run test`

## To view dapp:

go to `http://localhost:8000`  
your browser need to have Metamask installed to check out account balance.
please make sure that your Metamask connects to localhost:7545.  
if you get the error "tx nonce not correct", you need to reset accounts on Metamask  
click on Settings -> Advanced -> Rest Account.  
ganache-cli doesn't show account balances on the fly. that's why you need to use Metamask to check out balances.  