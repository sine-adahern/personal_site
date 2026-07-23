"""
Draws thumb-home.svg — the innermost frame of the recursion.

The live miniature (HomeMini.astro) reproduces the home page inside the Home
card. Its *own* Home slot needs something to show, and nesting a third live
wheel is not worth the cost, so this file draws one: the same seven cards, on
the same wheel, using the same geometry the real page uses, projected by hand.

Geometry is the real thing divided by 3 (a 480px card on a 1440px viewport),
which is why the numbers below match WHEEL_GEOMETRY.desktop / 3.
"""

import math

W, H = 480, 270          # 16:9, matches the card face
U = 1 / 3                # one real page pixel, at 1440px viewport
CARD_W, CARD_H = 480 * U, 270 * U
RADIUS, PERSP = 780 * U, 1800 * U
N = 7
STEP = 360 / N

CX = W / 2
HEADER_H = (24 + 34 + 24) * U   # padding + line-height + padding
FOOTER_H = (24 + 17 + 24) * U
CY = HEADER_H + (H - HEADER_H - FOOTER_H) / 2

THEMES = {
    "dark": {
        "bg": "#000000",
        "glow": "#110410",
        "card": "#140510",
        "card_alt": "#1e0817",
        "caption": "#000000",
        "caption_op": 0.85,
        "text": "#FF69B4",
        "stroke_text": "#000000",
        "footer_text": "#FF69B4",
    },
    "light": {
        "bg": "#ffffff",
        "glow": "#ffe8f4",
        "card": "#f4f4f4",
        "card_alt": "#ffd9ec",
        "caption": "#ffffff",
        "caption_op": 0.9,
        "text": "#FF69B4",
        "stroke_text": "#000000",
        "footer_text": "#C22E7E",
    },
}

PINK = "#FF69B4"


def project(theta_deg, dx, dy):
    """Card-local (dx, dy) on the card at theta -> screen point + scale."""
    t = math.radians(theta_deg)
    # Card centre orbits to (R sin t, 0, R cos t); the card face turns with it.
    x = RADIUS * math.sin(t) + dx * math.cos(t)
    z = RADIUS * math.cos(t) - dx * math.sin(t)
    s = PERSP / (PERSP - z)
    return CX + x * s, CY + dy * s, s


def card_svg(theta, theme):
    prox = math.cos(math.radians(theta))
    opacity = 0.4 + 0.6 * ((prox + 1) / 2)
    emph = 0.8 + 0.2 * max(0.0, prox)

    hw, hh = CARD_W / 2 * emph, CARD_H / 2 * emph
    cap_h = 25 * U * emph              # caption bar height

    corners = [(-hw, -hh), (hw, -hh), (hw, hh), (-hw, hh)]
    pts = [project(theta, dx, dy)[:2] for dx, dy in corners]
    poly = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)

    cap = [(-hw, hh - cap_h), (hw, hh - cap_h), (hw, hh), (-hw, hh)]
    cap_pts = [project(theta, dx, dy)[:2] for dx, dy in cap]
    cap_poly = " ".join(f"{x:.1f},{y:.1f}" for x, y in cap_pts)

    fill = theme["card_alt"] if abs(theta) < 1 else theme["card"]

    return (
        f'  <g opacity="{opacity:.3f}">\n'
        f'    <polygon points="{poly}" fill="{fill}" '
        f'stroke="{PINK}" stroke-width="{2 * U * emph:.2f}"/>\n'
        f'    <polygon points="{cap_poly}" fill="{theme["caption"]}" '
        f'fill-opacity="{theme["caption_op"]}"/>\n'
        f'  </g>\n'
    )


def shadow_svg(theta):
    prox = math.cos(math.radians(theta))
    opacity = 0.1 + 0.55 * ((prox + 1) / 2)
    spread = 1.0 + 0.4 * ((1 - prox) / 2)

    x, y, s = project(theta, 0, CARD_H / 2)
    rx = CARD_W / 2 * s * spread * 0.85
    ry = CARD_H / 8 * s * spread * 0.45

    return (
        f'  <ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{rx:.1f}" ry="{ry:.1f}" '
        f'fill="url(#floor)" opacity="{opacity:.3f}"/>\n'
    )


def build(name):
    theme = THEMES[name]

    # Depth order: furthest first, so nearer cards paint over them. The real
    # wheel gets this free from preserve-3d.
    angles = sorted(
        (((i * STEP + 180) % 360) - 180 for i in range(N)),
        key=lambda a: math.cos(math.radians(a)),
    )

    out = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'width="{W}" height="{H}" role="img" '
        f'aria-label="Miniature of the home page navigation wheel">\n',
        '  <defs>\n',
        '    <radialGradient id="bg" cx="50%" cy="0%" r="75%">\n',
        f'      <stop offset="0%" stop-color="{theme["glow"]}"/>\n',
        f'      <stop offset="60%" stop-color="{theme["bg"]}"/>\n',
        '    </radialGradient>\n',
        '    <radialGradient id="floor" cx="50%" cy="50%" r="50%">\n',
        '      <stop offset="0%" stop-color="#FF69B4" stop-opacity="0.45"/>\n',
        '      <stop offset="100%" stop-color="#FF69B4" stop-opacity="0"/>\n',
        '    </radialGradient>\n',
        '  </defs>\n\n',
        f'  <rect width="{W}" height="{H}" fill="url(#bg)"/>\n\n',
    ]

    out += ['  <!-- floor -->\n'] + [shadow_svg(a) for a in angles]
    out += ['\n  <!-- wheel -->\n'] + [card_svg(a, theme) for a in angles]

    # Header: the site title, at the size it really is, one third down.
    title_y = (24 + 24) * U
    out.append(
        f'\n  <text x="{32 * U:.1f}" y="{title_y:.1f}" '
        f'font-family="\'Press Start 2P\', monospace" font-size="{24 * U:.2f}" '
        f'fill="{theme["text"]}" stroke="{theme["stroke_text"]}" '
        f'stroke-width="{2 * U:.2f}" paint-order="stroke" '
        f'>Sin\u00e9ad Ahern</text>\n'
    )

    # Footer: rule plus a suggestion of the link text. Real type at this size
    # (4.7px) renders inconsistently across engines, so it is drawn as marks.
    rule_y = H - FOOTER_H
    out.append(
        f'\n  <line x1="0" y1="{rule_y:.1f}" x2="{W}" y2="{rule_y:.1f}" '
        f'stroke="{PINK}" stroke-opacity="0.3" stroke-width="{1 * U:.2f}"/>\n'
    )
    x = 24 * U
    word_y = rule_y + 24 * U
    for word_w in (14, 10, 6, 22):
        out.append(
            f'  <rect x="{x:.1f}" y="{word_y:.1f}" width="{word_w * U:.1f}" '
            f'height="{9 * U:.1f}" fill="{theme["footer_text"]}" opacity="0.85"/>\n'
        )
        x += (word_w + 5) * U

    out.append('</svg>\n')
    return "".join(out)


for name in THEMES:
    suffix = "" if name == "dark" else "-light"
    path = f"/home/claude/site/public/thumbs/thumb-home{suffix}.svg"
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(build(name))
    print("wrote", path)
