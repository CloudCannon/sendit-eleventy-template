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

        var replaced = scssFile;

        // Change the variables to whatever was set in the data file
        if (dataFile.theme.primary_color) {
            const replacementString = dataFile.theme.primary_color;
            replaced = replaced.replace(/\$color-primary: .*/g, ('$color-primary: ' + replacementString + ';'));
        } 
        if (dataFile.theme.secondary_color) {
            const replacementString = dataFile.theme.secondary_color;
            replaced = replaced.replace(/\$color-secondary: .*/g, ('$color-secondary: ' + replacementString + ';'));
        }         
        if (dataFile.theme.anchor_color) {
            const replacementString = dataFile.theme.anchor_color;
            replaced = replaced.replace(/\$color-anchor: .*/g, ('$color-anchor: ' + replacementString + ';'));
        } 
        if (dataFile.theme.background_effects_color) {
            const replacementString = dataFile.theme.background_effects_color;
            replaced = replaced.replace(/\$color-background-effects: .*/g, ('$color-background-effects: ' + replacementString + ';'));
        } 

        // Write result back to variables.scss
        fs.writeFile('./component-library/shared/styles/variables.scss', replaced, 'utf-8', function (err) {
            if(err){
                console.log(err);
            }
        });
    });
});