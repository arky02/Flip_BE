require("dotenv").config();
const OpenAIApi = require("openai");
const { CHATGPT_PROMPT } = require("./chatgpt-prompt");

const openai = new OpenAIApi({
  api_key: "process.env.OPENAI_API_KEY",
});

// ChatGPT에 대화식으로 요청을 보내는 함수
async function callChatGPT(message) {
  //console.log(message)

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 사용할 모델
      messages: [
        {
          role: "system",
          content: CHATGPT_PROMPT,
        },
        {
          role: "user",
          content: message, // 사용자에게 받은 커스텀 프롬프트
        },
      ],
      max_tokens: 4096, // 응답에서 사용할 최대 토큰 수
      temperature: 0.7, // 모델의 창의성 조정
    });

    // 응답 데이터 반환
    const chatGPTRes = response.choices[0].message.content;
    console.log("ChatGPT 답변:", chatGPTRes);
    return chatGPTRes;
  } catch (error) {
    console.error("ChatGPT 요청 중 오류:", error);
    throw error;
  }
}

module.exports = { callChatGPT };
