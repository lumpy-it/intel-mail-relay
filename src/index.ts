import AsyncAPI from './AsyncAPI.js';
import State from './State.js';
import * as request from 'request-promise-native';

// Top level async doesn't work, so wrap everything in function and execute directly
(async () => {
    // load config by simply requireing the json file
    const config = require('../config.json') as Config;
    
    const state = new State(); // automatically loads state.json

    let allMails: Message[] = [];

    // go through keys
    for(let key of config.keys) {
        const api = new AsyncAPI(
            key.keyID,
            key.vCode,
            key.characterID
        );

        let mailingListsResult = await api.fetch('Char:MailingLists') as MailingListsResult;

        let mailResult = await api.fetch('Char:MailMessages') as MailMessagesResult;
        let mails = Object.values(mailResult.messages);

        // only process new mails
        mails = mails.filter(m => m.messageID > state.getMaxMessageID(key.keyID));

        // get array of messageIDs for getting the bodies
        let ids = mails.map(x => x.messageID);

        if(ids.length > 0) {
            let mailBodiesResult = await api.fetch('Char:MailBodies', {IDs: ids}) as MailBodiesResult;
        
            // add extra attributes to messages
            mails.forEach((mail) => {
                mail.body = mailBodiesResult.messages[mail.messageID].cdata;
                mail.keyName = key.name;
		if(mail.toListID != '') {
		    let mailingList = mailingListsResult.mailingLists[mail.toListID];
		    if(mailingList) {
			mail.mailingListName = mailingList.displayName;
		    } else {
			mail.mailingListName = "unknown";
		    }
		} else {
		    mail.mailingListName = '';
		}
                mail.mailingListName = (mail.toListID != '') ? 
                    mailingListsResult.mailingLists[mail.toListID].displayName : '';

                allMails.push(mail);
            });
            // set the new newest messsageID
            state.setMaxMessageID(key.keyID,Math.max(...ids));
        }
    }

    if(allMails.length > 0) {
        console.log(`Posting ${allMails.length} mails`);
        try {
            let response = await request.post(config.url, {
                auth: {
                    bearer: config.token
                },
                json: allMails
            });
            console.log(`success code: ${response.statusCode}`);
            
            state.save();
        } catch (exception) {
            console.log(`error code: ${exception.statusCode}`);
        }   
    }
})();
