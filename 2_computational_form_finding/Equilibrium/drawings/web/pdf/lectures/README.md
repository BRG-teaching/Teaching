# Lecture slide decks — not stored in git

The 18 lecture decks from the eQUILIBRIUM platform total **338 MB**, which is
too much to put in a teaching repository's history permanently. They are listed
in `../catalog.json` with their source URLs, and

    uv run python drawings/web/tools/fetch_course_pdfs.py --lectures

downloads them into this folder. Everything else the platform offers — the ten
exercise sheets in both languages, every published solution, and all 62
compendium chapters — IS in the repository.
