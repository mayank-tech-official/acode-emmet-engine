"use strict";

(() => {
  const plugin = {
    id: "acode.emmet.engine",
    name: "Acode Emmet Engine"
  };

  class EmmetPlugin {
    async init() {
      this.editor = editorManager.editor;

      editorManager.editor.commands.addCommand({
        name: "emmetExpand",
        bindKey: { win: "Enter", mac: "Enter" },

        exec: (ed) => {
          const session = ed.session;
          const pos = ed.getCursorPosition();
          let line = session.getLine(pos.row).trim();

          if (!line || line.startsWith("<")) {
            session.insert(pos, "\n");
            return;
          }

          const html = this.expand(line);

          session.replace({
            start: { row: pos.row, column: 0 },
            end: { row: pos.row, column: session.getLine(pos.row).length }
          }, html);

          ed.moveCursorToPosition({
            row: pos.row + 1,
            column: 1
          });
        }
      });
    }

    expand(input) {
      let parts = input.split(">");
      let output = "";
      let indent = 0;

      for (let part of parts) {
        let tag = part;
        let cls = "";
        let id = "";
        let mult = 1;

        let c = tag.match(/\.(\w+)/);
        if (c) cls = c[1];

        let i = tag.match(/#(\w+)/);
        if (i) id = i[1];

        let m = tag.match(/\*(\d+)/);
        if (m) {
          mult = Number(m[1]);
          tag = tag.replace(/\*\d+/, "");
        }

        tag = tag.replace(/\.\w+/, "").replace(/#\w+/, "");

        for (let j = 0; j < mult; j++) {
          let attrs = "";
          if (cls) attrs += ` class="${cls}"`;
          if (id) attrs += ` id="${id}"`;

          output += "  ".repeat(indent) + `<${tag || "div"}${attrs}></${tag || "div"}>\n`;
          indent++;
        }
      }

      return output;
    }
  }

  if (window.acode) {
    const plugin = new EmmetPlugin();
    acode.setPluginInit("acode.emmet.engine", () => plugin.init());
    acode.setPluginUnmount("acode.emmet.engine", () => {});
  }
})();
