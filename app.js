const API_KEY = "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";

const submitButton = document.querySelector("#submit");
const outPutElement = document.querySelector("#output");
const inputElement = document.querySelector("input");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector("button");

function clearInput() {
  inputElement.value = "";
}

function retrievePrompt(value) {
  const inputElement = document.querySelector("input");
  inputElement.value = value;
}

async function getMessage() {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: inputElement.value,
        },
      ],
      max_tokens: 20,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();

    const pElement = document.createElement("p");
    pElement.textContent = inputElement.value;
    pElement.addEventListener("click", () =>
      retrievePrompt(pElement.textContent)
    );
    historyElement.append(pElement);

    if (data.choices) {
      outPutElement.textContent = data.choices[0].message.content;
    } else if (data.error.code === "insufficient_quota") {
      outPutElement.textContent = data.error.message;
    } else {
      otherContent = { ...data };
      console.log(otherContent);
      outPutElement.textContent = otherContent;
    }
  } catch (error) {
    console.error(error);
  }
}

submitButton.addEventListener("click", getMessage);
buttonElement.addEventListener("click", clearInput);
