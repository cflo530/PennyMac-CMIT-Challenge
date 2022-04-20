const fs = require('fs');

fs.readFile('w_data.dat', 'utf-8', (err, data) => {
    // Check if file exists, if it doesn't, throw error
    if(err) throw err;

    // Parse data line by line into its own array
    const cells = data.split('\n').map((el) => {
        return el.split(/\s+/)
    });

    // Get first array from cells which will be our Headers
    const headers = cells.shift();

    // Filter out unnecessary headers and just keep DY, MxT, and MnT
    headers.splice(4, 14);

    // Map out our data into readable JSON
    const obj = cells.map((el) => {
        let tempObj = {};

        for(let i = 0; i < el.length; i++) {
            // Filter out unnecessary data and just get the values for our headers
            el.splice(4, 6);

            // Get rid of asterisk from our dataset
            if(el[i].includes('*')) {
                tempObj[headers[i]] = el[i].replace('*', '');
            } else {
                tempObj[headers[i]] = el[i];
            }
        }

        return tempObj;
    });

    // Hashmap to hold all of our spreads
    let spreads = {};

    // Fill up spreads with Dy as key and spread as value
    for(let i = 1; i < obj.length - 1; i++) {
        spreads[obj[i].Dy] = obj[i].MxT - obj[i].MnT;
    }

    // Get minimum value from all spreads
    const minVal = Math.min(...Object.values(spreads));

    // Key that will be returned with our minimum value
    const minKey = Object.keys(spreads).find(key => spreads[key] === minVal);
    

    console.log(minKey);
});