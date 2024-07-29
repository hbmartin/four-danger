# Generating the 16 SVG files with the specified characteristics

import os

# Define the characteristics
strokes = ["dashed", "none"]
colors = ["#996BC7", "#6BC78A"]
shapes = ["circle", "square"]
holes = ["with_hole", "without_hole"]

# Define the directory to save SVGs
output_dir = "./components/"
os.makedirs(output_dir, exist_ok=True)

# Function to create SVG content
def create_svg(stroke, color, shape, hole):
    stroke_dasharray = 'stroke-dasharray="5,5"' if stroke == "dashed" else ''
    shape_element = ''
    name = ''
    
    if shape == "circle":
        name += "Circle"
        if hole == "with_hole":
            name += "Hole"
            shape_element = f'<circle cx="50" cy="50" r="40" stroke="{color}" stroke-width="2" fill="none" {stroke_dasharray}/>\n' \
                            f'<circle cx="50" cy="50" r="20" fill="none" stroke="{color}" stroke-width="2" />'
        else:
            name += "Solid"
            shape_element = f'<circle cx="50" cy="50" r="40" stroke="{color}" stroke-width="2" fill="none" {stroke_dasharray}/>'
    else:  # square
        name += "Square"
        if hole == "with_hole":
            name += "Hole"
            shape_element = f'<rect x="10" y="10" width="80" height="80" stroke="{color}" stroke-width="2" fill="none" {stroke_dasharray}/>\n' \
                            f'<rect x="30" y="30" width="40" height="40" fill="none" stroke="{color}" stroke-width="2" />'
        else:
            name += "Solid"
            shape_element = f'<rect x="10" y="10" width="80" height="80" stroke="{color}" stroke-width="2" fill="none" {stroke_dasharray}/>'
    if stroke == "dashed":
        name += "Dashed"
    else:
        name += "Noout"
    if color == "#6BC78A":
        name += "Green"
    else:
        name += "Purple"
    svg_content = '<svg {...props} width="100" height="100" xmlns="http://www.w3.org/2000/svg">\n' \
                  f'  {shape_element}\n' \
                  '</svg>'
    return name, svg_content

# Generate and save SVG files
names = []
svg_components = ""
for shape in shapes:
    for hole in holes:
        for stroke in strokes:
            for color in colors:
                filename = f"{shape}_{color.strip('#')}_{stroke}_{hole}.svg"
                name, svg_content = create_svg(stroke, color, shape, hole)
                names.append(name)
                svg_components += f'function {name}(props: any)' + '{\n' \
                '    return (\n' \
                f'      {svg_content}' + '\n' \
                '    )\n' \
                '}\n\n'

svg_components += 'export { ' + ','.join(names) + ' }'

filepath = os.path.join(output_dir, "pieces.tsx")

with open(filepath, "w") as file:
    file.write(svg_components)
