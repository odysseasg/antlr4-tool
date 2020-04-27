"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
// The functions in prototype obj that we don't want to place in the type signature of the rule context class are:
//
// Methods with one or more arguments:
//
// - constructor
// - enterRule
// - exitRule
// - accept
// - copyFrom
// - addChild
// - addTokenNode
// - addErrorNode
// - getChild
// - getToken
// - getTokens
// - getTypedRuleContext
// - getTypedRuleContexts
// - setAltNumber
// - toStringTree
// - toString
//
// Methods with zero arguments:
//
// - depth
var ignoredMethods = {
    'constructor': true,
    'depth': true,
    'enterRule': true,
    'exitRule': true,
    'accept': true,
    'copyFrom': true,
    'addChild': true,
    'addTokenNode': true,
    'addErrorNode': true,
    'getChild': true,
    'getToken': true,
    'getTokens': true,
    'getTypedRuleContext': true,
    'getTypedRuleContexts': true,
    'setAltNumber': true,
    'toStringTree': true,
    'toString': true,
};
function getMethods(obj, isRuleContext) {
    var result = [];
    // tslint:disable-next-line:forin
    for (var id in obj) {
        try {
            if (typeof (obj[id]) !== 'function') {
                continue;
            }
            if (obj[id].length === 0) {
                result.push({
                    name: id,
                    args: ''
                });
            }
            else if (isRuleContext && !ignoredMethods[id] && obj[id].length === 1) {
                // Assumption: All functions defined on the rule context classes, that take a single argument
                // and are not contained in `ignoredMethods` are methods for accessing tokens or rules that appear
                // more than once in the parent rule.
                // In that case, Antlr4 generates a function that accepts a single
                // numerical argument for accessing the i-th (zero-based) element that matched in the rule.
                // So create a type signature for a function that takes a single number argument, named "i".
                result.push({
                    name: id,
                    args: 'i: number'
                });
                result.push({
                    name: id,
                    args: '',
                    returnsArray: true
                });
            }
        }
        catch (err) {
        }
    }
    return result;
}
exports.getMethods = getMethods;
function grammar(config) {
    var grammarFile = config.grammar;
    return path.basename(grammarFile, '.g4');
}
exports.grammar = grammar;
function capitalizeFirstLetter(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
//# sourceMappingURL=util.js.map