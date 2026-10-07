import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_svg = """          <div class="comparison-slider">
            <div class="comparison-handle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" style="width: 20px; height: 20px;">
                <path d="m15 18-6-6 6-6" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" style="width: 20px; height: 20px;">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>"""

new_svg = """          <div class="comparison-slider">
            <div class="comparison-handle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px;">
                <path d="m14 18-6-6 6-6" />
                <path d="m10 18 6-6-6-6" />
              </svg>
            </div>
          </div>"""

content = content.replace(old_svg, new_svg)

# Let's also check if there are variations in indentation or newlines.
# Sometimes it's better to just regex the handle.
import re
regex = re.compile(r'<div class="comparison-handle">\s*<svg.*?<path d="m15 18-6-6 6-6".*?</svg>\s*<svg.*?<path d="m9 18 6-6-6-6".*?</svg>\s*</div>', re.DOTALL)
content = regex.sub("""<div class="comparison-handle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px;">
                <path d="m15 18-6-6 6-6" />
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>""", content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
