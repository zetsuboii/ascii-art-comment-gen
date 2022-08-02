"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const letters_1 = require("./letters");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "asciigen" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('asciigen.genAscii', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInputBox({
            prompt: "Enter comment to generate"
        }).then((inputText) => {
            if (inputText == undefined)
                return;
            vscode.window.showInputBox({
                prompt: "Enter the character to prepend, possibly comment character"
            }).then((commentChar) => {
                let out = "";
                for (let row = 0; row < 6; row++) {
                    out += commentChar + "\t";
                    for (let charIdx = 0; charIdx < inputText.length; charIdx++) {
                        const char = inputText.charAt(charIdx).toUpperCase();
                        if (!Object.keys(letters_1.default).includes(char)) {
                            vscode.window.showInformationMessage(`Invalid char ${char}`);
                        }
                        out += letters_1.default[char][row];
                    }
                    out += "\n";
                }
                vscode.env.clipboard.writeText(out);
                vscode.window.showInformationMessage('Copied to clipboard');
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map