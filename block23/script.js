const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-acc-ct-pt-b';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        const result = await response.json();
        return result.data.players;
        
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}${playerId}`);
        const result = await response.json();
        return result.data.player;

    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

    // class newPlayer {
    //     construcor (id, name, breed, status,imageURL){
    //          this.id = id;
    //          this.name = name;
    //          this.breed = breed;
    //          this.status = status;
    //          this.imageURL = imageURL;
    //     }
    // }

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(
            APIURL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Rufus',
                    breed: 'Irish Setter',
                }),
                }
            );
            const result = await response.json();
            //console.log(result);
            return result.data.newPlayer ;

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};
    


const removePlayer = async (playerId) => {
    try {
        await fetch(`${APIURL}${playerId}` , {
            method: 'DELETE'
        });
        const players = await fetchAllPlayers() ;
        renderAllPlayers(playerList);
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = async (playerList) => {
    try {
        const players = await fetchAllPlayers();
        players.forEach((player) => {
            const newPlayerCard = renderSinglePlayer(player);
            playerContainer.appendChild(newPlayerCard);
        });
    
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

const renderSinglePlayer = (player) => {
    // create the card with class and append to container
    const newPlayerCard = document.createElement("div");
    newPlayerCard.id = player.id;
    newPlayerCard.className = "player-card";
    playerContainer.appendChild(newPlayerCard);

  // create the h4 for name and append to card
    const newPlayerName = document.createElement("h4");
    newPlayerCard.appendChild(newPlayerName);
    newPlayerName.innerHTML = player.name;

  // create the img for image and append to card
    const newPlayerImage = document.createElement("img");
    newPlayerImage.className = "player-image";
    newPlayerCard.appendChild(newPlayerImage);
    newPlayerImage.src = player.imageUrl;

  // create the show details button and append to card
    const showDetailsButton = document.createElement("button");
    newPlayerCard.appendChild(showDetailsButton);

    showDetailsButton.addEventListener(("click"), () => {
        const moreDetails = renderMoreDetails(player);
        newPlayerCard.appendChild(moreDetails);
    });

    showDetailsButton.innerHTML = "Show Details";

  // create the delete button and append to card
    const deleteButton = document.createElement("button");
    newPlayerCard.appendChild(deleteButton);

    deleteButton.innerHTML = "Delete";

    deleteButton.addEventListener(("click"), async () => {
        await removePlayer(player.id);
        // remove element from DOM
        const deleted = document.getElementById(player.id)
        deleted.remove();
    });

    return newPlayerCard;
}

const renderMoreDetails = (player) => {
    const breed = player.breed;
    const status = player.status;
    const teamId = player.teamId;
    
    const playerDetailsElement = document.createElement("div");
    playerDetailsElement.className = "detail";
    
    const playerDetailList = document.createElement("ul");
    playerDetailsElement.appendChild(playerDetailList);
    
    const breedElement = document.createElement("li");
    breedElement.innerHTML = `Breed: ${breed}`;
    playerDetailList.appendChild(breedElement);
    
    const statusElement = document.createElement("li");
    statusElement.innerHTML =  `Status: ${status}`;
    playerDetailList.appendChild(statusElement);

    const teamIdElement = document.createElement("li");
    statusElement.innerHTML =  `TeamId: ${teamId}`;
    playerDetailList.appendChild(teamIdElement);
    
    return playerDetailsElement;
    }
    
    const renderForm = () => {
        const form = document.createElement("div");
        form.innerHTML = 
            `<form>
                <label for="name">Name:</label><br>
                <input type="text" id="name" name="name"><br>
                <label for="breed">Breed:</label><br>
                <input type="text" id="breed" name="breed"><br>
                <label for="status">Status:</label><br>
                <input type="text" id="status" name="status"><br>
                <label for="teamId">TeamId:</label><br>
                <input type="text" id="teamId" name="teamId"><br>
                <label for="imageUrl">ImageUrl:</label><br>
                <input type="text" id="imageUrl" name="imageUrl">
            </form>
            `;
        formContainer.appendChild(form);
        
        const submit = document.createElement("button");
        submit.setAttribute("type", "submit");
        submit.id = "submit-button";
        submit.innerHTML = "Submit";
        formContainer.appendChild(submit);
    }
    
    

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
    renderForm();
    renderNewPlayerForm();
}

init();