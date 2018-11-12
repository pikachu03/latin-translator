window.onload = function() {
	// Your JavaScript goes below
	let submitButton = document.getElementById("submitButton");
	let word = document.getElementById("word");
	let wordSearched = document.getElementById("wordSearched");
	let results = document.getElementById("results");
	let results2 = document.getElementById("results2");

	submitButton.addEventListener("click", () => {
		let latinWord = inputBox.value;
		wordSearched.innerText = latinWord;

		$.ajax({
			url: "https://glosbe.com/gapi/translate?from=la&dest=eng&format=json&phrase="+latinWord,
			dataType: 'jsonp',
			success: function(json) {
				results.innerText = "";
				results2.innerText = "";
				if (json.tuc.length < 1 || (!json.tuc[0].phrase && !json.tuc[0].meanings)) {
						results.innerText = "Sorry, no results were found. Please try searching a different word.";
				} else {
						// if (json.tuc[0].phrase) {
						// 		results.innerText = json.tuc[0].phrase.text;
						// } else if (json.tuc[0].meanings) {
						// 	results.innerText = json.tuc[0].meanings[0].text;
						// }
						let result;
						for (let i = 0; i < json.tuc.length; i++) {
							if (json.tuc[i].phrase) {
								if (result == '' || result == null) {
									result = json.tuc[i].phrase.text;
								} else {
									result += ", " + json.tuc[i].phrase.text;
								}
							} else if (json.tuc[i].meanings) {
								if (result == '' || result == null) {
									result = json.tuc[i].meanings[0].text;
								} else {
									result += "\n" + json.tuc[i].meanings[0].text;
								}
							}
							results.innerHTML = result;
						}


						// if (json.tuc) {
						// 	let result;
						// 	for (let i = 0; i < json.tuc.length; i++) {
						// 		if (result == '' || result == null) {
						// 			result = json.tuc[i].phrase.text;
						// 		} else {
						// 			result += "\n" + json.tuc[i].phrase.text;
						// 		}
						// 	}
						// }
				}
		}
		});

	});

}
