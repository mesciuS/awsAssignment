// richiediamo Responses dal file js
const Responses = require('../common/API_Responses');
// richiediamo Dynamo che abbiamo usato in get dal bostro file js
const Dynamo = require('../common/Dynamo');

// passiamo tableName direttamente dal file yml
const tableName = process.env.tableName;

// esportiamo la funzione
exports.handler = async event => {
    console.log('event', event)

    // se non esiste un ID nel pathParameter ritorniamo un messaggio specifico
    if (!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({message: 'missing ID'});
    }

    // ricaviamo l'ID dal pathParameters
    let ID = event.pathParameters.ID;

    // usiamo parse per deserializzare la stringa che ci restituisce lambda
    const user = JSON.parse(event.body);
    user.ID = ID;

    const newUser = await Dynamo.write(user, tableName).catch(err =>{
        console.log('error in dynamo write', err);
        return null;
    })

    if (!newUser){
        return Responses._400({message: 'failed to write user by ID'});
    }

    return Responses._200({newUser});
};