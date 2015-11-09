# Glint

This is my go-to structure for Sass and starting on CSS

## Todo
- [ ] change helpers to configurable based on `_variables.scss` (bg, colors, font sizes, font weights)
- [ ] set up some sort of templating engine so partials can be re-used for developing multiple pages that need the same content (header, footer, etc)
- [ ] get watching to work for new files added
- [ ] add `del` to remove dist on builds
- [ ] add `imagemin`
- [ ] add a sass warning if media mixin in used and passed a constant that doesn't exist e.g. `@include media(huge) {...}` when should be `media(lg)` 
