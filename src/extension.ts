import * as vscode from "vscode";
import { execFileSync } from "child_process";
import * as path from "path";

function git(cwd: string, args: string[]): string {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
  }).trim();
}

function getGitRoot(startPath: string): string | undefined {
  try {
    return git(path.dirname(startPath), ["rev-parse", "--show-toplevel"]);
  } catch {
    return undefined;
  }
}

function isGithubHost(host: string): boolean {
  const h = host.toLowerCase();
  return h === "github.com" || h.endsWith(".github.com");
}

function parseGithubRemote(
  remoteUrl: string,
): { host: string; owner: string; repo: string } | undefined {
  const u = remoteUrl.trim();
  const ssh = /^git@([^:]+):([^/]+)\/(.+?)(?:\.git)?$/i.exec(u);
  if (ssh && isGithubHost(ssh[1])) {
    return {
      host: ssh[1],
      owner: ssh[2],
      repo: ssh[3].replace(/\.git$/i, ""),
    };
  }
  const https =
    /^https:\/\/([^/]+)\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i.exec(u);
  if (https && isGithubHost(https[1])) {
    return {
      host: https[1],
      owner: https[2],
      repo: https[3].replace(/\.git$/i, ""),
    };
  }
  return undefined;
}

function getOriginUrl(gitRoot: string): string {
  // Read the configured value directly. `git remote get-url` applies
  // url.<base>.insteadOf rewrites, which can replace github.com with a
  // machine-specific SSH alias that is unsuitable for a browser URL.
  return git(gitRoot, ["config", "--get", "remote.origin.url"]);
}

/**
 * Resolves the default branch that `origin/HEAD` points to (e.g. main, master).
 */
function getDefaultBranchName(gitRoot: string): string {
  const abbrev = git(gitRoot, ["rev-parse", "--abbrev-ref", "origin/HEAD"]);
  const prefix = "origin/";
  if (!abbrev.startsWith(prefix)) {
    throw new Error(`Unexpected origin/HEAD: ${abbrev}`);
  }
  return abbrev.slice(prefix.length);
}

function toGithubBlobPath(relativePath: string): string {
  return relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export function activate(context: vscode.ExtensionContext): void {
  const disposable = vscode.commands.registerCommand(
    "openOnGithub.openCurrentLine",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        void vscode.window.showWarningMessage(
          "Open a file in the editor first.",
        );
        return;
      }

      const doc = editor.document;
      if (doc.isUntitled || doc.uri.scheme !== "file") {
        void vscode.window.showWarningMessage("Save the file on disk first.");
        return;
      }

      const fsPath = doc.uri.fsPath;
      const gitRoot = getGitRoot(fsPath);
      if (!gitRoot) {
        void vscode.window.showErrorMessage("Not inside a Git repository.");
        return;
      }

      let originUrl: string;
      let defaultBranch: string;
      try {
        originUrl = getOriginUrl(gitRoot);
        defaultBranch = getDefaultBranchName(gitRoot);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        void vscode.window.showErrorMessage(`Git failed: ${msg}`);
        return;
      }

      const parsed = parseGithubRemote(originUrl);
      if (!parsed) {
        void vscode.window.showErrorMessage(
          `Origin is not a GitHub URL: ${originUrl}`,
        );
        return;
      }

      const rel = path.relative(gitRoot, fsPath);
      if (rel.startsWith("..") || path.isAbsolute(rel)) {
        void vscode.window.showErrorMessage(
          "File is outside the Git repository root.",
        );
        return;
      }

      const line = editor.selection.active.line + 1;
      const blobPath = toGithubBlobPath(rel.split(path.sep).join("/"));
      const url = `https://${parsed.host}/${parsed.owner}/${parsed.repo}/blob/${defaultBranch}/${blobPath}#L${line}`;

      await vscode.env.openExternal(vscode.Uri.parse(url));
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
