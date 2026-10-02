# Asset folders

Place new images in the folder that matches the listing:

- `topre/boards/` for complete keyboards
- `topre/keysets/` for keysets, modifiers, and individual keys
- `resin/` for resin-keycap references

Use lowercase, descriptive filenames. Then update the matching `image` path in `../data.js`. For a listing with multiple images, add one `{ image, alt }` entry for each file to its `images` array.