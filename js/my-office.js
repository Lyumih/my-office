Vue.component("block-change", {
  props: ["block", "color"],
  template: `<div class="card shadow-sm mb-3">
              <div class="card-body text-center" :style="color==='lightcoral'? 'background-color: rgba(255, 0, 0, 0.07);': ''">
                <div><button class="btn btn-sm btn-block">...</button></div>
                <div :style="{background:color}">{{block.current}}</div>
                <div><button class="btn btn-sm btn-block">...</button></div>
                <a class="btn btn-sm btn-outline-success" title="Согласен"><i class="fa fa-check" aria-hidden="true"></i></a>
                <a class="btn btn-sm btn-outline-danger" title="Не согласен"><i class="fa fa-times" aria-hidden="true"></i></a>
                <a class="btn btn-sm btn-outline-primary" title="Внести правку"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                <a class="btn btn-sm btn btn-outline-warning" title="Оставить оригинал"><i class="fa fa-clock-o" aria-hidden="true"></i></a>
              </div>
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

Мой 4 добавленны абзац

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
      let colors = [];
      for (let i = 0; i < this.documentHash.length; i++) {
        let hash = this.documentHash[i];
        let color = "lightgreen";
        this.otherDocumentsHash.forEach(otherDocument => {
          if (otherDocument[i] !== hash) {
            color = "lightcoral";
          }
        });
        colors.push(color);
      }
      return colors;
    },
    otherDocumentsColor() {
      let otherColors = [];
      this.otherDocumentsHash.forEach(otherHashs => {
        if (otherHashs[this.paragraph] === this.documentHash[this.paragraph]) {
          otherColors.push("lightgreen");
        } else {
          otherColors.push("lightcoral");
        }
      });
      return otherColors;
    }
  }
});
