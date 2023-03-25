# cyber-dolphin-chatGPT-AlexaSkill

ChatGPT APIと接続して、音声で問い合わせが出来るAlexaスキルのソースコードです。

VoiceLunchJP #29でLTしました。
https://voicelunchjp.connpass.com/event/277699/

※ 2023/3/25時点の初回バージョンです。<br>
※ Alexa-hostedスキルにインポートする事が出来ないようです。調査中です。<br>
GitリポジトリをAlexa-hostedスキルにインポートする<br>
https://developer.amazon.com/ja-JP/docs/alexa/hosted-skills/alexa-hosted-skills-git-import.html

日本語版 サイバーイルカ<br>
https://www.amazon.co.jp/HideG-%E3%82%B5%E3%82%A4%E3%83%90%E3%83%BC%E3%82%A4%E3%83%AB%E3%82%AB/dp/B0BYRVTV7H/

英語版　cyber dolphin<br>
https://www.amazon.com/HideG-cyber-dolphin/dp/B0BYRVTV7H/

大元
https://github.com/alexa-samples/skill-sample-nodejs-hello-world
また、ネット上の多くの記事に助けていただきました。ありがとうございます。

特徴は、次の通りです。<br>
Alexa-hostedスキルで作成<br>
openaiを読み込む設定<br>
skill-sample-nodejs-hello-worldを元に作成して、日本語と英語に対応<br>
ChatGPT APIに日本語で問い合わせるとAlexaの8秒制限までにレスポンスが返ってこないので、一旦英語に翻訳します。<br>
翻訳するためにAWSのAmazon Translateを使用<br>

AWSのAmazon Translateを呼びたす方法は、次を参照してください。<br>
Alexa-hostedスキルで個人のAWSリソースを使用する<br>
https://developer.amazon.com/ja-JP/docs/alexa/hosted-skills/alexa-hosted-skills-personal-aws.html
