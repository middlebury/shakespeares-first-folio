# Shakespeare's First Folio

One-page microsite for First Folio! The Book that Gave Us Shakespeare: an exhibition on tour from the Folger Shakespeare Library

## Dependencies

- Gulp `npm install -g gulp`

Install node/gulp dependencies:

```bash
$ npm install
```

## Running locally

```bash
$ gulp
```

Compiles Sass and boots up BrowserSync at `http://localhost:8080`

## Publishing

Though the project uses `gulp-gh-pages`, it does not publish to GitHub pages. The intention is to deploy the static site to a separate branch, so Middlebury ITS can pull down the branch to their hosting server as plain, compiled, static content.

```
$ gulp deploy --production
```

This takes the output `dist` folder and commits it to the `site` branch, then pushes to GitHub. Don't forget the `--production` to minify assets.

As mentioned above, IT then has to pull this branch to the server so it's live.
