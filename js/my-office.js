Vue.component("block-change", {
  props: ["block"],
  template: `<div>
              <div>Автор: {{ block.author }}</div>
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

var app = new Vue({
  el: "#app",
  data: {
    modes: ["Абзац", "Предложение"],
    modeSelected: "Абзац",
    paragraph: 0,
    document: [
      createBlock(12, "white", "misha", "Мой 1 абзац. С точной и без", "curr"),
      createBlock(12, "green", "misha", "Мой 2 изменённый абзац", "curr"),
      createBlock(12, "gray", "misha", "Мой 3 удалённый абзац", "curr"),
      createBlock(12, "blue", "misha", "Мой 4 добавленный абзац", "curr"),
      createBlock(12, "yellow", "misha", "Мой 5 перемещенный абзац", "curr")
    ],

    otherDocuments: [
      [
        createBlock(
          12,
          "white",
          "misha",
          "Мой 1 абзац. С точной и без",
          "1 1"
        ),
        createBlock(12, "green", "misha", "Мой 2 изменённый абзац", "curr"),
        createBlock(12, "gray", "misha", "Мой 3 удалённый абзац", "curr"),
        createBlock(12, "blue", "misha", "Мой 4 добавленный абзац", "curr"),
        createBlock(12, "yellow", "misha", "Мой 5 перемещенный абзац", "curr")
      ],
      [
        createBlock(
          12,
          "white",
          "misha",
          "Мой 1 абзац. С точной и без",
          "1 2"
        ),
        createBlock(12, "green", "misha", "Мой 2 изменённый абзац", "curr"),
        createBlock(12, "gray", "misha", "Мой 3 удалённый абзац", "curr"),
        createBlock(12, "blue", "misha", "Мой 4 добавленный абзац", "curr"),
        createBlock(12, "yellow", "misha", "Мой 5 перемещенный абзац", "curr")
      ],
      [
        createBlock(
          12,
          "white",
          "misha",
          "Мой 1 абзац. С точной и без",
          "1 3"
        ),
        createBlock(12, "green", "misha", "Мой 2 изменённый абзац", "curr"),
        createBlock(12, "gray", "misha", "Мой 3 удалённый абзац", "curr"),
        createBlock(12, "blue", "misha", "Мой 4 добавленный абзац", "curr"),
        createBlock(12, "yellow", "misha", "Мой 5 перемещенный абзац", "curr")
      ]
    ]
  },
  computed: {}
});

var mockText = "";
