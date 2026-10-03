# Open on GitHub

VS Code extension that opens the current file and cursor line on GitHub in the repository **default branch** (from `origin/HEAD`, or `origin/main` / `origin/master` when `origin/HEAD` is not set).

## How to use

1. Install the extension (from a `.vsix` or once published, from the [Open VSX Registry](https://open-vsx.org/)).

2. Open a workspace folder that is a Git clone of a **GitHub** repository. The remote named **`origin`** must point at `github.com` (HTTPS or SSH).

3. Open a **saved** file from that repo (not an unsaved buffer). Put the cursor on the line you care about.

4. Open the Command Palette (`Cmd+Shift+P` on macOS, `Ctrl+Shift+P` on Windows/Linux), run **Open Current Line on GitHub**, and confirm your browser opens the matching blob URL for the default branch, with a line anchor (`#L…`) for the current line.

5. Optional: assign a keyboard shortcut in **Keyboard Shortcuts** by searching for `Open Current Line on GitHub`.

If nothing opens, ensure `git remote get-url origin` is a GitHub URL. If the default branch is neither `main` nor `master`, ensure `origin/HEAD` is set (for example `git remote set-head origin -a`).

## Contributing

To build, package, or publish the extension, see [CONTRIBUTING.md](CONTRIBUTING.md).
