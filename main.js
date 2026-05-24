"use strict";

(() => {

    const allowedTags = [
        "html","head","body","title","meta","link","style","script",
        "div","span","section","article","header","footer","nav","main","aside",
        "h1","h2","h3","h4","h5","h6","p","br","hr",
        "strong","b","em","i","small","mark",
        "a","img","audio","video","source","iframe",
        "ul","ol","li","dl","dt","dd",
        "form","input","textarea","button","select","option","label","fieldset","legend",
        "table","tr","td","th","thead","tbody","tfoot","caption",
        "canvas","svg","template","noscript"
    ];

    const indent = "    ";

    class EmmetPlugin {
        async init() {

            editorManager.editor.commands.addCommand({
                name: "emmetExpand",
                bindKey: { win: "Tab", mac: "Tab" },

                exec: (ed) => {

                    const session = ed.session;
                    const pos = ed.getCursorPosition();
                    const line = session.getLine(pos.row);

                    const trimmed = line.trim();

                    if (!trimmed || trimmed.startsWith("<")) return;

                    const html = this.expand(trimmed);

                    session.replace({
                        start: { row: pos.row, column: 0 },
                        end: { row: pos.row, column: line.length }
                    }, html);

                    // FIX: proper cursor position inside last tag
                    const lines = html.split("\n");

                    let cursorRow = 0;
                    let cursorCol = 0;

                    for (let i = 0; i < lines.length; i++) {
                        const idx = lines[i].indexOf("|");
                        if (idx !== -1) {
                            cursorRow = pos.row + i;
                            cursorCol = idx;
                            break;
                        }
                    }

                    ed.moveCursorToPosition({
                        row: cursorRow,
                        column: cursorCol
                    });
                }
            });
        }

        expand(input) {

            const parts = input.split(">");
            let result = "";

            let stack = [];

            for (let i = 0; i < parts.length; i++) {

                let part = parts[i];

                let tag = part.replace(/[#.].*/, "").trim();
                if (!allowedTags.includes(tag)) tag = "div";

                let cls = (part.match(/\.([\w-]+)/) || [])[1];
                let id = (part.match(/#([\w-]+)/) || [])[1];

                let attrs = "";
                if (cls) attrs += ` class="${cls}"`;
                if (id) attrs += ` id="${id}"`;

                result += indent.repeat(i) + `<${tag}${attrs}>\n`;
                stack.push(tag);
            }

            result += indent.repeat(parts.length) + "|\n";

            for (let i = stack.length - 1; i >= 0; i--) {
                result += indent.repeat(i) + `</${stack[i]}>\n`;
            }

            return result;
        }
    }

    if (window.acode) {
        const plugin = new EmmetPlugin();
        acode.setPluginInit("acode.emmet.engine", () => plugin.init());
        acode.setPluginUnmount("acode.emmet.engine", () => {});
    }

})();
