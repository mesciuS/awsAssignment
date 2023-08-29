// richiediamo Responses dal file js
const Responses = require('../common/API_Responses');
// richiediamo Dynamo che abbiamo usato in get dal bostro file js
const Dynamo = require('../common/Dynamo');

// passiamo tableName direttamente dal file yml
const tableName = process.env.tableName;

// esportiamo la funzione
exports.handler = async event => {
    console.log('event', event)

    if (!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({message: 'missing ID'});
    }

    // ricaviamo l'ID dal pathParameters
    let ID = event.pathParameters.ID;


    const user = await Dynamo.get(ID, tableName).catch(err => {
        // rendiamo sicuro che se la richiesta non va a buon fine possiamo vedere il log dell'errore
        console.log("error in dynamo get", err);
        // dato che vogliamo vedere l'errore ritorniamo null
        return null;
    });

    // abbiamo creato un errore se non troviamo lo user e adesso creiamo la risposta
    if (!user){
        return Responses._400({message: 'failed to get user by ID'});
    }

    // se lo user esiste facciamo un return di user
    return Responses._200({user});
};