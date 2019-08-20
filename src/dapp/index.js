
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';


(async() => {

    let result = null;

    let contract = new Contract('localhost', () => {

        // Read transaction
        contract.isOperational((error, result) => {
            console.log(error,result);
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });

        DOM.elid('register-airline').addEventListener('click', async () => {

            let airlineName = DOM.elid('airline-name').value;
            await contract.registerAirline(airlineName).catch(e => {
                console.error(e);
                throw e;
            })
            alert(`${airlineName} airline is registered!`)
        })



        DOM.elid('get-balance').addEventListener('click', async () => {
            let balance = await contract.getBalance();
            console.log(`balance is ${balance}`)
        })

        DOM.elid('authorize-contract').addEventListener('click', async () => {
            await contract.authorizeAppContract().catch(e => {
                alert(e)
                throw e
            })
            alert('App contract authorized!')
        })


        DOM.elid('register-flight').addEventListener('click', async () => {
            let dateString = DOM.elid('timestamp').value
            let flightName = DOM.elid('flight-name').value

            let timestamp = Date.parse(dateString)
            if (timestamp == NaN) {
                let msg = 'date string is not valid.'
                alert(msg)
                throw msg
            }

            await contract.registerFlight(timestamp, flightName).catch(e => {
                throw e
            })

            alert(`flight ${flightName} is registered!`)

        })

        DOM.elid('fund-airline').addEventListener('click', async () => {
            // todo check for digit
            let amount = DOM.elid('amount').value
            if (isNaN(amount)) {
                let msg = 'invalid ether amount!'
                alert(msg)
                throw msg
            }
            await contract.fundAirline(amount).catch(e => {
                alert('failed to fund airline.')
                throw e
            })
            alert(`${amount} ether funded!`)
        })


        DOM.elid('buy-insurance').addEventListener('click', async () => {
            let dateString = DOM.elid('timestamp-insurance').value
            let flightName = DOM.elid('flight-name').value

            let timestamp = Date.parse(dateString)
            if (timestamp == NaN) {
                let msg = 'date string is not valid.'
                alert(msg)
                throw msg
            }

            await contract.buyInsurance(flightName, timestamp).catch(e => {
                alert(e)
                throw e
            })

            alert('bought insurance!')
        })


        DOM.elid('claim-insurance').addEventListener('click', async () => {
            let dateString = DOM.elid('timestamp-claim').value
            let flightName = DOM.elid('flight-name').value

            let timestamp = Date.parse(dateString)
            if (timestamp == NaN) {
                let msg = 'date string is not valid.'
                alert(msg)
                throw msg
            }

            await contract.fetchFlightStatus(flightName, timestamp).catch(e => {
                alert(e)
                throw e
            })

            alert('you claimed insurance. if you already get paid eariler, nothing will happen and the server logs the error.')
        })


    });
    

})();


function display(title, description, results) {
    let displayDiv = DOM.elid("display-wrapper");
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
        row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : String(result.value)));
        section.appendChild(row);
    })
    displayDiv.append(section);

}







