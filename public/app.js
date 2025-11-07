document.getElementById("def_form").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("lookup").value;
  fetch_definition(input);
});

async function fetch_definition(word) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data = await response.json();
  
  let definitions = data[0].meanings[0].definitions[0].definition;

  render_response(data);
};

function render_response(data) {
  let display = document.getElementById('display');
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }

  let word_header = document.createElement('h2');
  defined_word = data[0].word;
  defined_word = defined_word.charAt(0).toUpperCase() + defined_word.substring(1); // title case for the defined word
  word_header.textContent = defined_word;
  display.appendChild(word_header);

  let pronunciation_header = document.createElement('h3');
  let pronunciation = data[0].phonetics[0].text;
  pronunciation_header.textContent = pronunciation;
  display.appendChild(pronunciation_header);
  
  for (let meaning of data[0].meanings) {
    let speech_header = document.createElement('h4');
    speech_header.textContent = meaning.partOfSpeech;
    display.appendChild(speech_header);

    speech_list = document.createElement('ol');
    for (let def of meaning.definitions) {
        let def_li = document.createElement('li');
        def_li.textContent = def.definition;
        speech_list.appendChild(def_li);
    }

    display.appendChild(speech_list);
    
    

  }

//   for (let meaning of data[0].meanings)
  
        // const newParagraph = document.createElement('p');

        // // Add text content to the paragraph
        // newParagraph.textContent = 'This paragraph was dynamically added by JavaScript.';

        // // Get the target element (the div with id 'contentArea')
        // const contentArea = document.getElementById('contentArea');

        // // Append the new paragraph to the target element
        // contentArea.appendChild(newParagraph);
  

};