// @flow
import buildHTML from "./buildHTML";
import buildMathML from "./buildMathML";
import buildCommon from "./buildCommon";
import Options from "./Options";
import Settings from "./Settings";
import Style from "./Style";

import type {AnyParseNode} from "./parseNode";
import type {DomSpan} from "./domTree";

const optionsFromSettings = function(settings: Settings) {
    return new Options({
        style: (settings.displayMode ? Style.DISPLAY : Style.TEXT),
        maxSize: settings.maxSize,
        minRuleThickness: settings.minRuleThickness,
    });
};

const displayWrap = function(node: DomSpan, settings: Settings): DomSpan {
    if (settings.displayMode) {
        const classes = ["parser-display"];
        if (settings.leqno) {
            classes.push("leqno");
        }
        if (settings.fleqn) {
            classes.push("fleqn");
        }
        node = buildCommon.makeSpan(classes, [node]);
    }
    return node;
};

export const buildTree = function(
    tree: AnyParseNode[],
    expression: string,
    settings: Settings,
): DomSpan {
    const options = optionsFromSettings(settings);
    let parseNode;
    if (settings.output === "mathml") {
        return  buildMathML(tree, expression, options, settings.displayMode, true);
    } else if (settings.output === "html") {
        const htmlNode = buildHTML(tree, options);
        parseNode = buildCommon.makeSpan(["parse"], [htmlNode]);
    } else {
        const mathMLNode = buildMathML(tree, expression, options,
            settings.displayMode, false);
        const htmlNode = buildHTML(tree, options);
        parseNode = buildCommon.makeSpan(["parse"], [mathMLNode, htmlNode]);
    }

    return displayWrap(parseNode, settings);
};

export const buildHTMLTree = function(
    tree: AnyParseNode[],
    expression: string,
    settings: Settings,
): DomSpan {
    const options = optionsFromSettings(settings);
    const htmlNode = buildHTML(tree, options);
    const parserNode = buildCommon.makeSpan(["parser"], [htmlNode]);
    return displayWrap(parserNode, settings);
};

export default buildTree;
