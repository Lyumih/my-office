String.prototype.replaceAll = function(search, replace) {
  return this.split(search).join(replace);
};

var checked1, checked2;
sentence1_another = [];

let finded_str = "";
function clearing(start_string) {
  for (var i = 0; i < text_for_clearning.length; i++)
    start_string = start_string.replaceAll(
      " " + text_for_clearning[i] + " ",
      " "
    );

  for (var i = 0; i < symbols_for_clearing.length; i++)
    start_string = start_string.replaceAll(symbols_for_clearing[i], "");

  for (var i = 0; i < ending_for_clearing.length; i++)
    start_string = start_string.replaceAll(ending_for_clearing[i] + " ", " ");
  start_string = start_string.trimLeft();
  var shingles = start_string.split(" ");
  return start_string;
}

var symbols_for_clearing = ["-", ".", ",", ":", "!", "?", ";", "  "];
var text_for_clearning = [
  "это",
  "как",
  "так",
  "и",
  "в",
  "над",
  "к",
  "до",
  "не",
  "на",
  "но",
  "за",
  "то",
  "с",
  "ли",
  "а",
  "во",
  "от",
  "со",
  "для",
  "о",
  "же",
  "ну",
  "вы",
  "бы",
  "что",
  "кто",
  "он",
  "она"
];
var ending_for_clearing = [
  "а",
  "я",
  "о",
  "е",
  "ь",
  "ы",
  "и",
  "ая",
  "яя",
  "ое",
  "ee",
  "ой",
  "ые",
  "ие",
  "ый",
  "йй"
];

function normilize(start_string) {
  start_string = start_string.toLowerCase();
  start_string = " " + start_string;
  start_string = clearing(start_string);
  return start_string;
}

function find_similar(sentence1, sentence2) {
  var count1 = 0;
  var sentence11 = sentence1.slice();
  var sentence21 = sentence2.slice();
  for (var num = 0; num < sentence1.length; num++) {
    for (var check = 0; check < sentence2.length; check++) {
      if (sentence1[num] == sentence2[check]) {
        sentence2[check] = " ";
        count1++;
        break;
      }
    }
  }
  var count2 = 0;
  for (var num = 0; num < sentence21.length; num++) {
    for (var check = 0; check < sentence11.length; check++) {
      if (sentence21[num] == sentence11[check]) {
        sentence11[check] = " ";
        count2++;
        break;
      }
    }
  }
  var count =
    ((count1 * count2) / (sentence21.length * sentence1.length)) * 100;
  return count;
}

function color_change(sentence1, sentence2) {
  sentence1 = sentence1.split(" ");
  sentence2 = sentence2.split(" ");
  sentence1_another = [];
  for (var num = 0; num < sentence2.length; num++) {
    if (sentence1.indexOf(sentence2[num]) == -1) {
      console.log(sentence1.indexOf(sentence2[num]));
      sentence1_another.push(num);
    }
  }
  console.log(sentence1_another);
}

function find_the_most_similar_by_paragraph(sentence, paragraph) {
  finded_str = sentence;
  sentence = normilize(sentence);
  paragraph.trimRight();
  var sentences = paragraph.split(".");
  for (var i = 0; i < sentences.length; i++) {
    sentences[i] = sentences[i].trimLeft();
    sentences[i] = sentences[i].trimRight();
  }
  var the_most_similar = { text: "", count: 0, id: 0 };
  var check_sentence = { text: "", count: 0, id: 0 };
  for (var i = 0; i < sentences.length; i++) {
    check_sentence.text = sentences[i];
    check_sentence.text = normilize(check_sentence.text);
    check_sentence.id = i;
    if (sentences[i] != " " && sentences[i] != "") {
      console.log("сравнение: " + check_sentence.text + " и " + sentence);
      check_sentence.count = find_similar(sentence, check_sentence.text);
    }

    if (check_sentence.count > the_most_similar.count) {
      the_most_similar.id = check_sentence.id;
      the_most_similar.count = check_sentence.count;
    }
  }
  console.log(checked1, checked2);
  return {
    raiting: the_most_similar.count,
    text: sentences[the_most_similar.id]
  };
}

function find_the_most_similar_by_text(sentence, paragraph) {
  finded_str = sentence;
  sentence = normilize(sentence);
  paragraph.trimRight();
  var sentences = paragraph.split("\n");
  for (var i = 0; i < sentences.length; i++) {
    sentences[i] = sentences[i].trimLeft();
    sentences[i] = sentences[i].trimRight();
  }
  var the_most_similar = { text: "", count: 0, id: 0 };
  var check_sentence = { text: "", count: 0, id: 0 };
  for (var i = 0; i < sentences.length; i++) {
    check_sentence.text = sentences[i];
    check_sentence.text = normilize(check_sentence.text);
    check_sentence.id = i;
    if (sentences[i] != " " && sentences[i] != "") {
      console.log("сравнение: " + check_sentence.text + " и " + sentence);
      check_sentence.count = find_similar(sentence, check_sentence.text);
    }

    if (check_sentence.count > the_most_similar.count) {
      the_most_similar.id = check_sentence.id;
      the_most_similar.count = check_sentence.count;
    }
  }
  console.log(checked1, checked2);
  return {
    raiting: the_most_similar.count,
    text: sentences[the_most_similar.id]
  };
}

//normilize('Это и самый неотформатированный текст, и самый длинный!');
function start_find() {
  var b = find_the_most_similar_by_paragraph(
    document.getElementById("finded").value,
    document.getElementById("alltext").value
  );
  b = b + ".";

  document.getElementById("answer").innerHTML =
    "Советуем заменить строчку на :" + b;
}
