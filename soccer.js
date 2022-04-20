const fs = require('fs');

fs.readFile('soccer.dat', 'utf-8', (err, data) => {
    // Check is file exists, if it doesn't, throw error
    if(err) throw err;

    // Parse data line by line into its own array
    const cells = data.split('\n').map((el) => {
        return el.split(/\s+/)
    });
    // Pop empty element from cells
    cells.pop();

    // Get first array from cells which will be our Headers
    const headers = cells.shift();
    
    // # Symbol will help map our row number properly
    headers[0] = '#';

    // Map out our data into readable JSON
    const obj = cells.map((el) => {
        let tempObj = {};

        for(let i = 1; i < el.length -1; i++) {
            // Check if last element in headers is not null so we can break from loop
            if(tempObj[headers[i - 1]]) continue;

            else{
                if(el[i] === '-') {
                    tempObj[headers[i - 1]] = el[i + 1];
                    tempObj[headers[i]] = el[i + 2];
                } else {
                    tempObj[headers[i - 1]] = el[i];
                }
            }
        }

        return tempObj;
    });

    // Hashmap to hold all goal differences
    const goals = {};

    // Fill up our goals object with Team as key and goal difference as value
    for(let i = 1; i < obj.length; i++) {
        goals[obj[i].Team] = Math.abs(obj[i].F - obj[i].A);
    }

    // Remove undefined value from our hashmap
    delete goals.undefined;

    // Get minimum value from all goals
    const minVal = Math.min(...Object.values(goals));

    // Team that will be returned from our minimum value
    const team = Object.keys(goals).find(key => goals[key] === minVal);

    console.log(team);
});