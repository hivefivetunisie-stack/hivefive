#!/usr/bin/env python3
"""Build the completely offline, single-file Hive Five application."""

from pathlib import Path
import base64
import mimetypes
import re

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "hive-five-app-autonome.html"


def data_uri(relative_path: str) -> str:
    path = ROOT / relative_path
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{encoded}"


def encoded_script_loader(*sources: str) -> str:
    """Return one safe loader whose payload contains no HTML-like JS source.

    The workspace viewer preprocesses HTML files and can misinterpret markup
    stored inside jsPDF's JavaScript strings. Each source is therefore UTF-8
    encoded as Base64. At runtime, a tiny loader decodes it and appends a real
    script element. This also works when the file is opened directly offline.
    """
    encoded_sources = [
        base64.b64encode(source.encode("utf-8")).decode("ascii")
        for source in sources
    ]
    source_array = ",\n      ".join(f'"{encoded}"' for encoded in encoded_sources)
    return f'''  <script>
  (() => {{
    const sources = [
      {source_array}
    ];
    const decoder = new TextDecoder("utf-8");
    for (const encoded of sources) {{
      const binary = atob(encoded);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) {{
        bytes[index] = binary.charCodeAt(index);
      }}
      const executable = document.createElement("script");
      executable.textContent = decoder.decode(bytes);
      document.head.appendChild(executable);
    }}
  }})();
  </script>'''


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    app = (ROOT / "app.js").read_text(encoding="utf-8")
    vendor = (ROOT / "vendor/jspdf.umd.min.js").read_text(encoding="utf-8")

    references = sorted(
        set(re.findall(r"assets/[A-Za-z0-9._/-]+", "\n".join((html, css, app)))),
        key=len,
        reverse=True,
    )
    for reference in references:
        uri = data_uri(reference)
        html = html.replace(reference, uri)
        css = css.replace(reference, uri)
        app = app.replace(reference, uri)

    html = html.replace(
        '  <link rel="stylesheet" href="styles.css" />',
        "  <style>\n" + css + "\n  </style>",
    )
    html = html.replace(
        '  <script src="vendor/jspdf.umd.min.js"></script>\n  <script src="app.js"></script>',
        encoded_script_loader(vendor, app),
    )

    forbidden = ("styles.css", "app.js", "vendor/", "assets/")
    remaining = [item for item in forbidden if item in html]
    if remaining:
        raise RuntimeError(f"Unembedded local references remain: {remaining}")
    if html.lower().count("<script") != 1 or html.lower().count("</script") != 1:
        raise RuntimeError("Unsafe nested script markup detected in standalone file")

    OUTPUT.write_text(html, encoding="utf-8")
    print(
        f"Generated {OUTPUT.name}: {OUTPUT.stat().st_size:,} bytes; "
        f"{len(references)} images embedded."
    )


if __name__ == "__main__":
    main()
