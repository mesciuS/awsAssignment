// creiamo un tool per semplificare le risposte alle chiamate api
// creiamo un oggetto chiamato Responses

const Responses = {
    _200(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 200,
            // non possiamo fare return semplicmente di data perchè non verrebbe accettato da api gateway, dobbiamo dunque fare lo stringify di quel data
            body: JSON.stringify(data)
        }
    },
    _400(data = {}) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 400,
            body: JSON.stringify(data)
        }
    },
};
// bisogna esportare quest'oggetto per poterlo richiamare e usare nelle nostre funzioni
module.exports = Responses;