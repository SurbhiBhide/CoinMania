//player Colours
const playerColours = ["blue", "pink", "orange", "yellow,", "green", "purple"];

//MiscHelpers
function randomFromArray(array){
    return array[Math.floor(Math.random() * array.length)]
}

function getKeyString(x, y) {
    return `${x}x${y}`;
}

//creates names
function createName(){
    const prefix = randomFromArray([
        "CUTE",
        "BUFF",
        "SCARY",
        "ANGRY",
        "COOL",
        "DOPE",
        "SAD",
        "DARK",
        "SOFT", 
        "CRANKY",
        "RICH",
        "ROWDY",
        "COZY",
        "SMUG",
    ]);

    const animal = randomFromArray([
        "CAT",
        "DOG",
        "MOOSE",
        "SEAL",
        "HIPPO",
        "LION",
        "TIGER",
        "BUG",
        "MULE",
        "BEAR",
        "FOX",
        "MULE"
    ]);

    return `${prefix} ${animal}`;

}

//game
(function (){

    let playerId;
    let playerRef;

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user);

        if(user){
            //logged in
            playerId = user.uid;
            playerRef = firebase.database().ref(`players/${playerId}`);

            const name = createName();

            playerRef.set({
                id: playerId,
                name,
                direction: "left",
                colour: randomFromArray(playerColours),
                x: 3,
                y: 10,
                coins: 0
            })

            //remover from firebsae on dissconnect
            playerRef.onDisconnect().remove();
        }else{
            //logged out
        }
    })

firebase.auth().signInAnonymously().catch((error) =>{
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage)
})

})();