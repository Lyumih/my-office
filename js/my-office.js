Vue.component("block-change", {
  props: ["paragraph", "text", "color"],
  template: `<div class="card shadow-sm mb-3">
              <div class="card-body text-center" :style="color==='lightcoral'? 'background-color: rgba(255, 0, 0, 0.07);': ''">
                <div><button class="btn btn-sm btn-block">...</button></div>
                <textarea class="w-100" :style="{background:color}" v-model="text"></textarea>
                <div><button class="btn btn-sm btn-block">...</button></div>
                <a class="btn btn-sm btn-outline-success" title="Согласен" @click="$emit('done-changes', paragraph, text)"><i class="fa fa-check" aria-hidden="true"></i></a>
                <a class="btn btn-sm btn-outline-danger" title="Не согласен" @click="$emit('cancel-changes', paragraph)"><i class="fa fa-times" aria-hidden="true"></i></a>
                <!--<a class="btn btn-sm btn-outline-primary" title="Внести правку" @click="$emit('edit-changes', paragraph, text)"><i class="fa fa-pencil" aria-hidden="true"></i></a>-->
                <a class="btn btn-sm btn btn-outline-warning" title="Оставить оригинал" @click="$emit('original-changes', paragraph)"><i class="fa fa-clock-o" aria-hidden="true"></i></a>
              </div>
            </div>
              `
});

var createBlock = (index, text) => {
  return { index, text };
};

var splitText = text => {
  let textSplitted = text;
  return textSplitted.map((text, index) => {
    return createBlock(index, text);
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
    change: 0,
    texts: [],
    startedText: []
  },
  created() {
    this.texts = [
      mockDocument.split("\n"),
      mockOtherDocument1.split("\n"),
      mockOtherDocument2.split("\n")
    ];
    this.startedText = JSON.parse(JSON.stringify(this.texts));
  },
  computed: {
    documentsHash() {
      return this.texts.map(element => {
        return element.map(subelement => {
          return this.hashing(subelement);
        });
      });
    },
    documentsColor() {
      colors = [];
      colors[0] = [];
      let original = this.documentsHash[0];

      original.forEach((item, index) => {
        let color = "lightgreen";
        this.documentsHash.slice(1).forEach(element => {
          if (element[index] !== item) color = "lightcoral";
        });

        colors[0].push(color);
      });

      this.documentsHash.slice(1).forEach((item, indexArray) => {
        colors[indexArray + 1] = [];
        item.forEach((hash, index) => {
          if (hash === this.documentsHash[0][index])
            colors[indexArray + 1].push("lightgreen");
          else {
            colors[indexArray + 1].push("lightcoral");
          }
        });
      });

      return colors;
    }
  },
  methods: {
    doneChanges(paragraph, newText) {
      for (let i = 0; i < this.texts.length; i++) {
        this.texts[i][paragraph] = newText;
      }
      this.texts.push(this.texts.pop());
    },
    cancelChanges(paragraph) {
      for (let i = 1; i < this.texts.length; i++) {
        this.texts[i][paragraph] = this.texts[0][paragraph];
      }
      this.texts.push(this.texts.pop());
    },
    originalChanges(paragraph) {
      for (let i = 0; i < this.texts.length; i++) {
        this.texts[i][paragraph] = this.startedText[i][paragraph];
      }
      this.texts.push(this.texts.pop());
    },
    editChanges(paragraph, newText) {
      this.doneChanges(paragraph, newText);
    },
    hashing(text) {
      return md5(text);
    }
  }
});
