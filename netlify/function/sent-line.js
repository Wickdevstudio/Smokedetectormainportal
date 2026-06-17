const line = require('@line/bot-sdk');

exports.handler = async (event) => {
  const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
  });

  const { ppm } = JSON.parse(event.body || '{}');

  await client.pushMessage({
    to: process.env.LINE_USER_ID,
    messages: [{
      type: 'flex',
      altText: '⚠️ แจ้งเตือนแก๊ส',
      contents: {
        type: 'bubble',
        body: { type: 'box', layout: 'vertical', contents: [
          { type: 'text', text: '🚨 แก๊สสูง!', weight: 'bold', size: 'xl' },
          { type: 'text', text: `ระดับ: ${ppm} ppm`, size: 'lg' }
        ]}
      }
    }]
  });

  return { statusCode: 200 };
};