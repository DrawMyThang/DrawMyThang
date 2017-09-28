var axios = require('axios');
var apiUrl = 'http://api.wordnik.com:80/v4/words.json/'+
'randomWord?hasDictionaryDef=true&' + 
'includePartOfSpeech=noun&' +
'excludePartOfSpeech=proper-noun&minCorpusCount=70000' +
'&maxCorpusCount=-1&minDictionaryCount=6' +
'&maxDictionaryCount=-1&minLength=3&maxLength=7' + 
'&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

var get_random_word = (io, uid) => {
    axios({
        method: 'get',
        url: apiUrl,
    })
    .then((response) => {
        console.log(response.data);
        response.data.uid = uid
        io.emit('display word', response.data);
    })
    .catch((err) => {
        console.log('there was an error with dictionary api call');
    })
}

module.exports = {
    get_random_word: get_random_word,
}