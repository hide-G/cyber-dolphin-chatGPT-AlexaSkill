/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const languageStrings = require('./languageStrings');
// Amazon Translateを使用する為
const AWS = require('aws-sdk');


// ChatGPT APIを使う為
const { Configuration, OpenAIApi } = require("openai");
const keys = require('./keys');
const configuration = new Configuration({
    apiKey: keys.OPEN_AI_KEY
});
const openai = new OpenAIApi(configuration);


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        let locale = handlerInput.requestEnvelope.request.locale;
        
        if( locale === 'ja-JP')
        {  
            const speakOutput = handlerInput.t('WELCOME_SPEAK');            
            
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                handlerInput.t('WELCOME_MSG'))
            .reprompt(speakOutput)
            .getResponse();
        } else {
            const speakOutput = handlerInput.t('WELCOME_MSG');
            
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                handlerInput.t('WELCOME_MSG'))
            .reprompt(speakOutput)
            .getResponse();
        }


    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELLO_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AskChatgptIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskChatgptIntent';
    },
    async handle(handlerInput) {
        
        let locale = handlerInput.requestEnvelope.request.locale;
        console.log('locale:'+locale);
        
        // AWSリソースロールは、STS AssumeRoleアクションを使用するとします
        const STS = new AWS.STS({ apiVersion: '2011-06-15' });
        
        const credentials = await STS.assumeRole({
            RoleArn: 'arn:aws:iam::（あなたのAWSアカウントで作成したものを貼り付けてください。）:role/TranslateForAlexa',
            RoleSessionName: 'ExampleSkillRoleSession' //任意の名前に変更できます
        }, (err, res) => {
            if (err) {
                console.log('AssumeRole FAILED: ', err);
                throw new Error('Error while assuming role');
            }
            return res;
        }).promise();
        const Translate = new AWS.Translate({
            // region: 'us-east-1',
            accessKeyId: credentials.Credentials.AccessKeyId,
            secretAccessKey: credentials.Credentials.SecretAccessKey,
            sessionToken: credentials.Credentials.SessionToken
        });
        
        function getAwsTranslate(text,in_Language,out_Language) {
            return new Promise(((resolve, reject) => {
                let params = {
                    Text: text,
                    SourceLanguageCode: in_Language,
                    TargetLanguageCode: out_Language
                }
                Translate.translateText(params, function(err,data){
                    if (err) {
                        console.log(err);
                        reject();
                    } else {
                        console.log(JSON.stringify(data));
                        resolve(data);
                    }
                });
            }))
        }
        

        let question = Alexa.getSlotValue(handlerInput.requestEnvelope, 'question');
        console.log(question);
        
        let speakOutput = '';
        
        if( locale === 'ja-JP')
        { 
            // 翻訳
            let rs = await getAwsTranslate(question,'ja','en');
        
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                           {role: "system", content: "You are a helpful smart speaker assistant. "},
                           {role: "system", content: "You will give a concise answer of about 100 characters so that it is easy to understand by listening to the voice."},
                           {role: "user", content: rs.TranslatedText}
                          ],
            });
            console.log(completion);
            console.log(completion.data.choices[0].message.content);
            // console.log(completion.data.choices[0].message);
            
            // 英語を日本語に翻訳する
            let en_ja = await getAwsTranslate(completion.data.choices[0].message.content,'en','ja');
            console.log(en_ja);
    
            speakOutput = en_ja.TranslatedText.trim() + handlerInput.t('REPROMPT_MSG');
            
        } else {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                           {role: "system", content: "You are a helpful smart speaker assistant. "},
                           {role: "system", content: "You will give a concise answer of about 100 characters so that it is easy to understand by listening to the voice."},
                           {role: "user", content: question}
                          ],
            });
            
            speakOutput = completion.data.choices[0].message.content.trim() + handlerInput.t('REPROMPT_MSG');
            console.log(speakOutput);
        }
        
        const repromptSpeakOutput = handlerInput.t('REPROMPT_MSG');
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                speakOutput)
            .reprompt(repromptSpeakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        
        let locale = handlerInput.requestEnvelope.request.locale;
        if( locale === 'ja-JP')
        {  
            const speakOutput = handlerInput.t('HELP_SPEAK');

            return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                handlerInput.t('HELP_MSG'))
            .reprompt(speakOutput)
            .getResponse();
        } else {
            const speakOutput = handlerInput.t('HELP_MSG');

            return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                handlerInput.t('HELP_MSG'))
            .reprompt(speakOutput)
            .getResponse();
        }
        
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('GOODBYE_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t('REFLECTOR_MSG');
        // const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = handlerInput.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard(
                handlerInput.t('SKILL_NAME'), 
                speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will bind a translation function 't' to the handlerInput
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        AskChatgptIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor)        
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();