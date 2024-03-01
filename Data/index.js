const fs = require('fs');

// Read the JSON file
fs.readFile('clean1.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse the JSON
    const jsonData = JSON.parse(data);

    // Iterate over the games and create a new array with only the desired fields
    const newGames = jsonData.games.mens.map((game) => {
        return {
            round: game.round,
            score1: game.score1,
            score2: game.score2,
            id: game.id,
            team1: game.team1,
            team2: game.team2,
        };
    });

    // Create a new JSON object
    const newJsonData = {
        games: {
            mens: newGames,
        },
    };

    // Write the new JSON to a file
    fs.writeFile(
        'filteredClean1.json',
        JSON.stringify(newJsonData, null, 4),
        'utf8',
        (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('File has been saved.');
        }
    );
});
