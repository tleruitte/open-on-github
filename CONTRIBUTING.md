# Contributing

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

5. In that window, follow **How to use** in the [README](README.md) to run the command against a real file in a GitHub clone.

## Package

Build a `.vsix` you can install locally or publish:

```bash
npm install
npm run compile
npm run package
```

This runs [`@vscode/vsce`](https://github.com/microsoft/vscode-vsce) via `npx` and writes `releases/open-on-github-<version>.vsix` (version from `package.json`).

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
