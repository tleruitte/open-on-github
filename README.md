# Open on GitHub

VS Code extension that opens the current file and cursor line on GitHub in the repository **default branch** (from `origin/HEAD`).

## How to use

1. Install the extension (from a `.vsix` or once published, from the [Open VSX Registry](https://open-vsx.org/)).

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

This runs [`@vscode/vsce`](https://github.com/microsoft/vscode-vsce) via `npx` and writes `releases/open-on-github-0.1.1.vsix` (version from `package.json`).

Install the VSIX in VS Code: **Extensions** view → **⋯** menu → **Install from VSIX…** and select the file.

## Publish a new version to Open VSX

Before publishing, expose your [Open VSX personal access token](https://open-vsx.org/user-settings/tokens) as the `OVSX_PAT` environment variable.

1. Ensure dependencies are installed and the extension compiles:

   ```bash
   npm install
   npm run compile
   ```

2. Upgrade the version using [semantic versioning](https://semver.org/):

   ```bash
   npm version patch
   ```

   Use `minor` or `major` instead of `patch` when appropriate. This updates the version in `package.json` and `package-lock.json`, then creates a Git commit and tag for the new version.

3. Package and publish the extension to Open VSX:

   ```fish
   npm run package
   set VERSION (node --print "require('./package.json').version")
   npx ovsx publish "releases/open-on-github-$VERSION.vsix"
   ```

4. Push the version commit and tag:

   ```bash
   git push origin main --follow-tags
   ```
