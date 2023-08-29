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

    // aggiungiamo il metodo POST per creare uno user
    async write (data, TableName) {
        // controlliamo se data ha un ID e se non è il caso ritorniamo un errore
        if (!data.ID) {
            throw Error('no ID on the data');
        };
        // se ha un ID creiamo i parametri
        const params = {
            TableName,
            Item: data
        };
        // creiamo la richiesta per aggiungere i dati alla tabella
        const res = await documentClient.put(params).promise();
        // controlliamo che res sia valido, in caso contrario throwiamo un errore
        if (!res) {
            throw Error(`there is an error inserting ID of ${data.ID} in table ${TableName}`)
        }

        return data;
    }

};

// bisogna esportare quest'oggetto per poterlo richiamare e usare nelle nostre funzioni
module.exports = Dynamo;