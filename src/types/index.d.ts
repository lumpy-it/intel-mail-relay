interface Config {
    url: string;
    token: string;
    keys: [APIKey]
}

interface APIKey {
    name: string;
    keyID: string;
    vCode: string;
    characterID: string;
}

interface MailMessagesResult {
    messages: { [key: string]: Message };
    currentTime: string;
    cachedUntil: string;
}

interface Message {
    messageID: number;
    senderID: number;
    senderName: string;
    sentDate: string;
    title: string;
    toCorpOrAllianceID: string;
    toCharacterIDs: string;
    toListID: string;
    senderTypeID: number;
    body?: string;
    keyName?: string;
    mailingListName?: string;
}

interface MailingListsResult {
    mailingLists: { [key: string]: MailingList};
    currentTime: string;
    cachedUntil: string;
}

interface MailingList {
    listID: string;
    displayName: string;
}

interface MailBodiesResult {
    messages: { [key: string]: MessageBody };
    currentTime: string;
    cachedUntil: string;
}

interface MessageBody {
    messageID: string;
    cdata: string;
}