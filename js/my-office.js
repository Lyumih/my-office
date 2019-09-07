Vue.component("block-change", {
  props: ["block", "color"],
  template: `<div>
              <div> Позиция: {{ block.index }}. Автор: {{ block.author }}</div>
              <div><button class="btn">Вверх блок</button></div>
              <div :style="{background:color}">{{block.current}}</div>
              <div><button class="btn">Вниз блок</button></div>
              <button class="btn btn-success">Согласен</button>
              <button class="btn btn-danger">Не согласен</button>
              <button class="btn btn-primary">Внести правку</button>
              <button class="btn btn btn-outline-warning">Оставить оригинал</button>
              </div>
              `
});

var createBlock = (index, color, author, origin, current) => {
  return { index, color, author, origin, current };
};

var splitText = text => {
  let textSplitted = text.split("\n");
  return textSplitted.map((element, index) => {
    return createBlock(index, "white", "any", element, element);
  });
};

var mockDocument = `Мой 1 абзац. С точной и без

Мой 2 изменённый абзац

Мой 3 удалённый абзац

Мой 4 добавленный абзац

Мой 5 перемещенный абзац`;

var mockOtherDocument1 = `Измен. Мой 1 абзац. С точной и без

Мой 2 изменённый абзац

Мой 3 удалённый абзац

Мой 4 добавленный абзац

Мой 5 перемещенный абзац`;

var mockOtherDocument2 = `Мой 1 абзац. С точной и без

Мой 2 изменённый абзац

Мой 3 удалённый абзац

Мой 4 добавленный абзац

Мой 5 перемещенный абзац`;

var app = new Vue({
  el: "#app",
  data: {
    modeSelected: "Абзац",
    paragraph: 0,
    texts: [mockDocument, mockOtherDocument1, mockOtherDocument2]
  },
  computed: {
    document() {
      return splitText(this.texts[0]);
    },
    otherDocuments() {
      let others = [];
      for (let i = 1; i < this.texts.length; i++) {
        others.push(splitText(this.texts[i]));
      }
      return others;
    },
    documentHash() {
      hashs = [];
      this.document.forEach(element => {
        hashs.push(sha256(element.current));
      });
      return hashs;
    },
    otherDocumentsHash() {
      let otherHash = [];
      this.otherDocuments.forEach(element => {
        let document = [];
        element.forEach(subelement => {
          document.push(sha256(subelement.current));
        });
        otherHash.push(document);
      });
      return otherHash;
    },
    documentColor() {
      let hashs = [];
      this.document.forEach(element => {
        hashs.push(sha256(element.current));
      });
      return hashs;
    },
    otherDocumentsColor() {
      let otherColors = [];
      this.otherDocumentsHash.forEach(otherHashs => {
        if (otherHashs[this.paragraph] === this.documentHash[this.paragraph]) {
          otherColors.push("green");
        } else {
          otherColors.push("red");
        }
      });
      return otherColors;
    }
  }
});
