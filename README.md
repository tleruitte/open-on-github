# Open on GitHub

VS Code extension that opens the current file and cursor line on GitHub in the repository **default branch** (from `origin/HEAD`).

## Development

1. Clone this repository and open the folder in VS Code.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile TypeScript once, or watch for changes:

   ```bash
   npm run compile
   ```

   ```bash
   npm run watch
   ```

4. Run the extension in an Extension Development Host: open **Run and Debug**, choose **Run Extension**, and press F5 (or start debugging). A new VS Code window opens with this extension loaded.

5. In that window, open a file inside a Git repo whose `origin` is GitHub, place the cursor on a line, then run the command **Open Current Line on GitHub** from the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`).

## Package

Build a `.vsix` you can install locally or publish:

```bash
npm install
npm run compile
npm run package
```

This runs [`@vscode/vsce`](https://github.com/microsoft/vscode-vsce) via `npx` and writes `open-on-github-0.1.0.vsix` (version from `package.json`) in the project root.

Install the VSIX in VS Code: **Extensions** view → **⋯** menu → **Install from VSIX…** and select the file.
