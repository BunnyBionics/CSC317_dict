document.getElementById("def_form").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("lookup").value;
  if (input == "") {
    warning("Please type in the box before pressing Submit.");
    return;
  }
  fetch_definition(input);
});

async function fetch_definition(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.status === 404) {
      warning("Word not found.");
      return;
    }
    const data = await response.json();
    render_response(data);
  } catch (error) {
    warning(error.message);
  }
}

function warning(message) {
  let display = document.getElementById("display");
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  let warning = document.createElement("p");
  warning.innerText = message;
  display.appendChild(warning);
}

function render_response(data) {
  let display = document.getElementById("display");
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }

  let word_header = document.createElement("h2");
  defined_word = data[0].word;
  defined_word = defined_word.charAt(0).toUpperCase() + defined_word.substring(1); // title case for the defined word
  word_header.textContent = defined_word;
  display.appendChild(word_header);

  let pronunciation_header = document.createElement("h3");
  let pronunciation = data[0].phonetics[0].text;
  pronunciation_header.textContent = pronunciation;
  display.appendChild(pronunciation_header);

  for (let meaning of data[0].meanings) {
    let speech_header = document.createElement("h4");
    speech_header.textContent = meaning.partOfSpeech;
    display.appendChild(speech_header);

    speech_list = document.createElement("ol");
    for (let def of meaning.definitions) {
      let def_li = document.createElement("li");
      def_li.textContent = def.definition;
      speech_list.appendChild(def_li);
    }

    display.appendChild(speech_list);
  }
}
