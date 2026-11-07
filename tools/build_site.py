import argparse
import os
import runpy
import shutil
import subprocess
import tarfile
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs"
EQ_WEB = Path("2_computational_form_finding/Equilibrium/drawings/web")
EQ_PYTHON = Path("2_computational_form_finding/Equilibrium/drawings/python")
DECK = "CAS Computational Form-Finding.pptx"


def copy_equilibrium(source, out):
    web_source = source / EQ_WEB
    web_out = out / EQ_WEB
    shutil.copytree(
        web_source,
        web_out,
        ignore=shutil.ignore_patterns("notes", "screenshots", "tools", "PLAN.md", ".gitignore", "__pycache__"),
    )
    shutil.copytree(source / EQ_PYTHON, out / EQ_PYTHON, ignore=shutil.ignore_patterns("__pycache__"))
    (web_out / "tools").mkdir()
    shutil.copy2(web_source / "tools/make_manifest.py", web_out / "tools/make_manifest.py")
    runpy.run_path(str(web_out / "tools/make_manifest.py"), run_name="__main__")
    shutil.rmtree(web_out / "tools")


def extract_equilibrium(out):
    with tempfile.TemporaryDirectory() as temporary:
        temporary = Path(temporary)
        archive = temporary / "equilibrium.tar"
        with archive.open("wb") as stream:
            subprocess.run(
                ["git", "archive", "equilibrium", str(EQ_WEB), str(EQ_PYTHON)],
                cwd=ROOT,
                stdout=stream,
                check=True,
            )
        with tarfile.open(archive) as source:
            source.extractall(temporary)
        copy_equilibrium(temporary, out)


def main():
    parser = argparse.ArgumentParser(description="Assemble the GitHub Pages deployment in docs/.")
    parser.add_argument("--equilibrium", type=Path, help="Checkout of the equilibrium branch")
    args = parser.parse_args()
    (ROOT / ".jupyterlite.doit.db").unlink(missing_ok=True)
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copy2(ROOT / "index.html", OUT / "index.html")
    shutil.copytree(
        ROOT / "CAS/website",
        OUT / "CAS/website",
        ignore=shutil.ignore_patterns("jupyter", "books", "tools", ".gitignore", "README.md", "__pycache__"),
    )
    shutil.copytree(ROOT / "CAS/logos", OUT / "CAS/logos")
    shutil.copytree(ROOT / "CAS/project/uploads", OUT / "CAS/project/uploads")
    shutil.copy2(ROOT / "CAS" / DECK, OUT / "CAS" / DECK)
    if args.equilibrium:
        copy_equilibrium(args.equilibrium.resolve(), OUT)
    else:
        extract_equilibrium(OUT)
    npm = shutil.which("npm")
    if npm is None:
        raise RuntimeError("npm is required to build the Vue website; run 'npm ci --prefix website' first.")
    version = subprocess.check_output(["git", "rev-parse", "--short", "HEAD"], cwd=ROOT, text=True).strip()
    subprocess.run([npm, "run", "build"], cwd=ROOT / "website", check=True, env={**os.environ, "VITE_BUILD_VERSION": version})
    files = sum(1 for path in OUT.rglob("*") if path.is_file())
    print(f"docs: assembled {files} deployment files")


if __name__ == "__main__":
    main()
