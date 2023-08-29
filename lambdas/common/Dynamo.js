// richiediamo le dipendenze necessarie
const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

// creiamo l'oggetto
const Dynamo = {
    // il nostro metodo GET prende ID e nome della tabella come parametri
    async get (ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        // passiamo i parametri nel documentClient e usiamo await in quanto è un processo asincrono
        const data = await documentClient
            .get(params)
            .promise()

        // gestiamo gli errori
        if (!data || !data.Item) {
            throw Error(`there was an error fetching the user for ID of ${ID} from ${TableName}`)
        }
        console.log(data);
        return data.Item;
    },

};

// bisogna esportare quest'oggetto per poterlo richiamare e usare nelle nostre funzioni
module.exports = Dynamo;