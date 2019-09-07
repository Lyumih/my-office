Vue.component("block-change", {
  props: ["block"],
  template: `<div>
              <div> Позиция: {{ block.index }}. Автор: {{ block.author }}</div>
              <div><button class="btn">Вверх блок</button></div>
              <div>{{block.current}}</div>
              <div><button class="btn">Вниз блок</button></div>
              <button class="btn btn-success">Согласен</button>
              <button class="btn btn-danger">Не согласен</button>
              <button class="btn btn-primary">Внести справку</button>
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
    texts: [mockDocument, mockOtherDocument1, mockOtherDocument2],

    otherDocuments: [
      [
        createBlock(
          0,
          "white",
          "misha",
          "Мой 1 абзац. С точной и без",
          "Мой 1 абзац. С точной и без"
        ),
        createBlock(
          1,
          "green",
          "misha",
          "Мой 2 изменённый абзац",
          "Мой 2 изменённый абзац"
        ),
        createBlock(
          2,
          "gray",
          "misha",
          "Мой 3 удалённый абзац",
          "Мой 3 удалённый абзац"
        ),
        createBlock(
          3,
          "blue",
          "misha",
          "Мой 4 добавленный абзац",
          "Мой 4 добавленный абзац"
        ),
        createBlock(
          4,
          "yellow",
          "misha",
          "Мой 5 перемещенный абзац",
          "Мой 5 перемещенный абзац"
        )
      ],
      [
        createBlock(
          0,
          "white",
          "misha",
          "Мой 1 абзац. С точной и без",
          "Мой 1 абзац. С точной и без"
        ),
        createBlock(
          1,
          "green",
          "misha",
          "Мой 2 изменённый абзац",
          "Мой 2 изменённый абзац"
        ),
        createBlock(
          2,
          "gray",
          "misha",
          "Мой 3 удалённый абзац",
          "Мой 3 удалённый абзац"
        ),
        createBlock(
          3,
          "blue",
          "misha",
          "Мой 4 добавленный абзац",
          "Мой 4 добавленный абзац"
        ),
        createBlock(
          4,
          "yellow",
          "misha",
          "Мой 5 перемещенный абзац",
          "Мой 5 перемещенный абзац"
        )
      ],
      [
        createBlock(
          0,
          "white",
          "misha",
          "Мой 1 абзац. С точной и без",
          "Мой 1 абзац. С точной и без"
        ),
        createBlock(
          1,
          "green",
          "misha",
          "Мой 2 изменённый абзац",
          "Мой 2 изменённый абзац"
        ),
        createBlock(
          2,
          "gray",
          "misha",
          "Мой 3 удалённый абзац",
          "Мой 3 удалённый абзац"
        ),
        createBlock(
          3,
          "blue",
          "misha",
          "Мой 4 добавленный абзац",
          "Мой 4 добавленный абзац"
        ),
        createBlock(
          4,
          "yellow",
          "misha",
          "Мой 5 перемещенный абзац",
          "Мой 5 перемещенный абзац"
        )
      ]
    ]
  },
  computed: {
    document() {
      return splitText(this.texts[0]);
    },
    otherDocuments() {
      array.forEach(element => {
        
      });
    }
  }
});
