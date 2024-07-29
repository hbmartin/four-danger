# Generating the 16 SVG files with the specified characteristics

import os

shapes = ["circle", "square"]
holes = ["with_hole", "without_hole"]
strokes = ["dashed", "none"]
colors = ["#C76BB8", "#81C76B"]

# Define the directory to save SVGs
output_dir = "./components/"
os.makedirs(output_dir, exist_ok=True)

outlined_color = "#474136"

square = 1
solid = 2
dashed = 4
purple = 8


# Function to create SVG content
def create_svg(stroke, color, shape, hole):
    print(f"create {shape} {hole} {stroke} {color}")
    stroke_dasharray = 'strokeDasharray="5,5"' if stroke == "dashed" else ""
    shape_element = ""
    name = ""
    index = 0

    if shape == "circle":
        name += "Circle"
        if hole == "with_hole":
            name += "Hole"
            shape_element = (
                f'<circle cx="50" cy="50" r="40" stroke="{color if stroke != "dashed" else outlined_color}" stroke-width="6" fill="{color}" {stroke_dasharray}/>\n'
                f'<circle cx="50" cy="50" r="20" fill="#ece3d4" stroke="{color}" stroke-width="6" />'
            )
        else:
            name += "Solid"
            index += solid
            shape_element = f'<circle cx="50" cy="50" r="40" stroke="{color if stroke != "dashed" else outlined_color}" stroke-width="6" fill="{color}" {stroke_dasharray}/>'
    else:  # square
        name += "Square"
        index += square
        if hole == "with_hole":
            name += "Hole"
            shape_element = (
                f'<rect x="10" y="10" width="80" height="80" stroke="{color if stroke != "dashed" else outlined_color}" stroke-width="6" fill="{color}" {stroke_dasharray}/>\n'
                f'<rect x="30" y="30" width="40" height="40" fill="#ece3d4" stroke="{color}" stroke-width="6" />'
            )
        else:
            name += "Solid"
            index += solid
            shape_element = f'<rect x="10" y="10" width="80" height="80" stroke="{color if stroke != "dashed" else outlined_color}" stroke-width="6" fill="{color}" {stroke_dasharray}/>'

    if stroke == "dashed":
        name += "Dashed"
        index += dashed
    else:
        name += "Noout"

    if color == colors[1]:
        name += "Green"
    else:
        name += "Purple"
        index += purple
    svg_content = (
        '<svg {...props} width="100" height="100" xmlns="http://www.w3.org/2000/svg">\n'
        f"  {shape_element}\n"
        "</svg>"
    )
    return name, index, svg_content

parameter_combinations = [(shape, hole, stroke, color) 
                         for shape in shapes
                         for hole in holes
                         for stroke in strokes
                         for color in colors]
indices = {}
svg_components = ""

for shape, hole, stroke, color in parameter_combinations:
    name, index, svg_content = create_svg(stroke, color, shape, hole)
    indices[index] = name
    svg_components += (
        f"function {name}(props: any)" + "{\n"
        "    return (\n"
        f"      {svg_content}" + "\n"
        "    )\n"
        "}\n\n"
                )

pieces_indexed = [indices[k] for k in sorted(indices.keys())]
print(pieces_indexed)
svg_components += "const pieces = [" + ", ".join(pieces_indexed) + "]\n"
svg_components += """
interface PieceProps {
    piece: number;
}

export const Piece: React.FC<PieceProps> = ({piece, ...props}) => (
    pieces[piece](props)
)
"""
filepath = os.path.join(output_dir, "pieces.tsx")

with open(filepath, "w") as file:
    file.write(svg_components)
