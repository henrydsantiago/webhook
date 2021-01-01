const express = require('express')
const app = express()
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

app.get('/', function (req, res) {
  res.send('Usando Nodemon')
})
 
app.post('/webhook', express.json(), function (req, res) {
    const agent = new WebhookClient({ request: req, response:res });
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
   
    function welcome(agent) {
      agent.add(`Welcome to my agent!`);
    }
   
    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }

    function disponible(agent) {
        agent.add(`Hola este es nuestro catálogo`)
        agent.add(new Card({
            title: ` `,
            imageUrl: 'https://i.blogs.es/73a4d8/https://scontent.fscl25-1.fna.fbcdn.net/v/t1.0-9/132321178_194606685643639_4741462958175326098_n.png?_nc_cat=110&ccb=2&_nc_sid=c4c01c&_nc_eui2=AeELyA0z0ATg5u5_gzLQY2TGDa-oqr_dP0INr6iqv90_QggNbKVpELQvAMCZy7N_wvwXhQ8jbIcN21FciTvowBV3&_nc_ohc=97JWTLFQP6QAX9g4kVz&_nc_ht=scontent.fscl25-1.fna&oh=859169740fbfc8d1abf4c1ba486d9680&oe=6013FE99',
            text: ``
            /* buttonText: 'This is a button',
            buttonUrl: 'https://assistant.google.com/' */
            })
        );
        agent.add(new Card({
            title: ` `,
            imageUrl: 'https://scontent.fscl25-1.fna.fbcdn.net/v/t1.0-9/132364560_194636665640641_342669111191897012_n.png?_nc_cat=101&ccb=2&_nc_sid=c4c01c&_nc_eui2=AeE1mzp1SaZH1XYebBb2tTeeq5vk4-ZteBKrm-Tj5m14EiRNLGEsuvG0uUrxSfg6nDmFNAwaXtb1o3xQaZEgyLCu&_nc_ohc=0v8q3LK9NxIAX9IiAhS&_nc_ht=scontent.fscl25-1.fna&oh=f6a8eb07ecef01e3cd4caa29e0505336&oe=60128E20',
            text: ``
            /* buttonText: 'This is a button',
            buttonUrl: 'https://assistant.google.com/' */
            })
        );
      /* agent.add(`Desde webhoook`); */
/*       agent.add(new Card({
               title: `Title: this is a card title`,
               imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
               text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
               buttonText: 'This is a button',
               buttonUrl: 'https://assistant.google.com/'
            })
        ); */
    }
  
   let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('starcraft', disponible);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
  });
 
app.listen(3000, ()=> console.log('Estamos ejecutando el servidor'));