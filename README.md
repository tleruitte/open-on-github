# Open on GitHub

VS Code extension that opens the current file and cursor line on GitHub in the repository **default branch** (from `origin/HEAD`).

## How to use

1. Install the extension (from a `.vsix` or once published, from the Marketplace).

2. Open a workspace folder that is a Git clone of a **GitHub** repository. The remote named **`origin`** must point at `github.com` (HTTPS or SSH).

3. Open a **saved** file from that repo (not an unsaved buffer). Put the cursor on the line you care about.

4. Open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux), run **Open Current Line on GitHub**, and confirm your browser opens the matching blob URL for the default branch (`origin/HEAD`), with a line anchor (`#L…`) for the current line.

5. Optional: assign a keyboard shortcut in **Keyboard Shortcuts** by searching for `Open Current Line on GitHub`.

If nothing opens, ensure `git remote get-url origin` is a GitHub URL and that `origin/HEAD` is set (for example `git remote set-head origin -a`).

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

5. In that window, follow **How to use** above to run the command against a real file in a GitHub clone.

## Package

Build a `.vsix` you can install locally or publish:

```bash
npm install
npm run compile
npm run package
```

This runs [`@vscode/vsce`](https://github.com/microsoft/vscode-vsce) via `npx` and writes `open-on-github-0.1.1.vsix` (version from `package.json`) in the project root.

Install the VSIX in VS Code: **Extensions** view → **⋯** menu → **Install from VSIX…** and select the file.
