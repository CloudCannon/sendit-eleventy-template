const fs = require('fs');
// read theme color from _data/site.json
fs.readFile('./site/_data/site.json', 'utf8', function(err, dataFile){
    
    if(err){
        console.log(err);
        return;
    }
    
    // parse file to JSON so that the variables can be accessed
    dataFile = JSON.parse(dataFile);

    // TODO: Check if dataFile.primary_theme_color is set
    // Open variables.scss and search/replace "$theme: ..." with color from data file
    fs.readFile('./component-library/shared/styles/variables.scss', 'utf-8', function (err, scssFile) {

        if(err){
            console.log(err);
            return;
        }

        const replacementString = dataFile.primary_theme_color;

        // Change the color-primary variable to whatever was set in the data file
        const replaced = scssFile.replace(/\$color-primary: .*/g, ('$color-primary: ' + replacementString + ';'));
    
        // Write result back to variables.scss
        fs.writeFile('./component-library/shared/styles/variables.scss', replaced, 'utf-8', function (err) {
            if(err){
                console.log(err);
            }
        });
    });
});