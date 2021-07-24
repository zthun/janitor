/* istanbul exclude coverage */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, window } from 'vscode';
import chalk from 'chalk';

/**
 * The method that gets called as a result of activation.
 *
 * @param context The extension context.
 */
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(chalk.green('Congratulations, your extension "lint-janitor" is now active!'));

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = commands.registerCommand('lint-janitor.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    window.showInformationMessage('Hello World from Lint Janitor!');
  });

  context.subscriptions.push(disposable);
}

/**
 * The method that gets called when the extension is deactivated.
 */
export function deactivate() {
  return;
}
