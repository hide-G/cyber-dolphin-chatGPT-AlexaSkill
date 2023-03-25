/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
    ja: {
        translation: {
            SKILL_NAME: 'サイバーイルカ',
            WELCOME_MSG: '私はサイバーイルカです。ChatGPTに音声で質問できます。「何々について教えて」のように話かけてください。どうぞ！',
            WELCOME_SPEAK: '私はサイバーイルカです。<phoneme type="ruby" ph="チャットジーピーティー">ChatGPT</phoneme>に音声で質問できます。「何々について教えて」のように話かけてください。どうぞ！',
            HELLO_MSG: 'ハローワールド',
            REPROMPT_MSG: '続けて聞きたいことがあれば話しかけてください。どうぞ！',
            HELP_MSG: 'このスキルはアメリカのOpenAI社のChatGPT APIに接続するスキルです。話しかけられた内容はAIの学習には利用されないようになっております。どうぞご安心ください。終わる場合は終了と話掛けてください。',
            HELP_SPEAK: 'このスキルはアメリカの<phoneme type="ruby" ph=" オープン エーアイ">OpenAI</phoneme>社の<phoneme type="ruby" ph="チャットジーピーティー エーピーアイ">ChatGPT API</phoneme>に接続するスキルです。話しかけられた内容はAIの学習には利用されないようになっております。どうぞご安心ください。終わる場合は終了と話掛けてください。',
            GOODBYE_MSG: 'ご利用ありがとうございました。終了します。',
            REFLECTOR_MSG: 'システムメッセージです。{{intentName}}がトリガーされました。',
            FALLBACK_MSG: 'ごめんなさい。ちょっとよくわかりませんでした。もう一度言ってみてください。',
            ERROR_MSG: 'ごめんなさい。なんだかうまく行かないようです。もう一度言ってみてください。'
        }
    },
    en: {
        translation: {
            SKILL_NAME: 'Cyber Dolphin',
            WELCOME_MSG: 'My name is Cyber Dolphin. You can ask questions to chat G P T by voice. Please say something like, ask me about something. please!',
            HELLO_MSG: 'Hello World!',
            REPROMPT_MSG: 'If there is anything you would like to hear more about, please let me know. please!',
            HELP_MSG: 'This skill connects to OpenAI\'s ChatGPT API in the United States. The spoken content is not used for AI learning. Please rest assured. When you are finished, please tell me to finish.',
            GOODBYE_MSG: 'Goodbye!',
            REFLECTOR_MSG: 'You just triggered {{intentName}}',
            FALLBACK_MSG: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MSG: 'Sorry, I had trouble doing what you asked. Please try again.'
        }
    },
    // es: {
    //     translation: {
    //         WELCOME_MSG: 'Bienvenido, puedes decir Hola o Ayuda. Cual prefieres?',
    //         HELLO_MSG: 'Hola Mundo!',
    //         HELP_MSG: 'Puedes decirme hola. Cómo te puedo ayudar?',
    //         GOODBYE_MSG: 'Hasta luego!',
    //         REFLECTOR_MSG: 'Acabas de activar {{intentName}}',
    //         FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
    //         ERROR_MSG: 'Lo siento, ha habido un error. Por favor inténtalo otra vez.'
    //     }
    // },
    // de: {
    //     translation: {
    //         WELCOME_MSG: 'Wilkommen, du kannst Hallo oder Hilfe sagen. Was würdest du gern tun?',
    //         HELLO_MSG: 'Hallo!',
    //         HELP_MSG: 'Du kannst hallo zu mir sagen. Wie kann ich dir helfen?',
    //         GOODBYE_MSG: 'Tschüss!',
    //         REFLECTOR_MSG: 'Du hast gerade {{intentName}} ausgelöst',
    //         FALLBACK_MSG: 'Es tut mir leid, ich weiss das nicht. Bitte versuche es erneut.',
    //         ERROR_MSG: 'Es tut mir leid, ich konnte das nicht machen. Bitte versuche es erneut.'
    //     }
    // },
    // fr: {
    //     translation: {
    //         WELCOME_MSG: 'Bienvenue sur le génie des salutations, dites-moi bonjour et je vous répondrai',
    //         HELLO_MSG: 'Bonjour à tous!',
    //         HELP_MSG: 'Dites-moi bonjour et je vous répondrai!',
    //         GOODBYE_MSG: 'Au revoir!',
    //         REFLECTOR_MSG: 'Vous avez invoqué l\'intention {{intentName}}',
    //         FALLBACK_MSG: 'Désolé, je ne sais pas. Pouvez-vous reformuler?',
    //         ERROR_MSG: 'Désolé, je n\'ai pas compris. Pouvez-vous reformuler?'
    //     }
    // },
    // it: {
    //     translation: {
    //         WELCOME_MSG: 'Buongiorno! Puoi salutarmi con un ciao, o chiedermi aiuto. Cosa preferisci fare?',
    //         HELLO_MSG: 'Ciao!',
    //         HELP_MSG: 'Dimmi ciao e io ti risponderò! Come posso aiutarti?',
    //         GOODBYE_MSG: 'A presto!',
    //         REFLECTOR_MSG: 'Hai invocato l\'intento {{intentName}}',
    //         FALLBACK_MSG: 'Perdonami, penso di non aver capito bene. Riprova.',
    //         ERROR_MSG: 'Scusa, c\'è stato un errore. Riprova.'
    //     }
    // },
    // pt: {
    //     translation: {
    //         WELCOME_MSG: 'Bem vindo, você pode dizer Olá ou Ajuda. Qual você gostaria de fazer?',
    //         HELLO_MSG: 'Olá!',
    //         HELP_MSG: 'Você pode dizer olá para mim. Como posso te ajudar?',
    //         GOODBYE_MSG: 'Tchau!',
    //         REFLECTOR_MSG: 'Você acabou de ativar {{intentName}}',
    //         FALLBACK_MSG: 'Desculpe, não sei o que dizer. Por favor tente novamente.',
    //         ERROR_MSG: 'Desculpe, não consegui fazer o que você pediu. Por favor tente novamente.'
    //     }
    // },
    // hi: {
    //     translation: {
    //         WELCOME_MSG: 'नमस्ते, आप hello या help कह सकते हैं. आप क्या करना चाहेंगे?',
    //         HELLO_MSG: 'नमस्ते दुनिया ',
    //         HELP_MSG: 'आप मुझसे hello बोल सकते हो.',
    //         GOODBYE_MSG: 'अलविदा ',
    //         REFLECTOR_MSG: 'आपने {{intentName}} trigger किया हैं ',
    //         FALLBACK_MSG: 'Sorry, मैं वो समझ नहीं पायी. क्या आप दोहरा सकते हैं ',
    //         ERROR_MSG: 'Sorry, मैं वो समझ नहीं पायी. क्या आप दोहरा सकते हैं '
    //     }
    // }
}