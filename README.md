# Error Document Template #
> HTML source of error document used in my personal website

![Preview](./docs/preview.png)

## Setup ##
Below shows some basic setup steps.

### Node version ###
This project is developed using Node.js 12. The version is already specified in the `.nvmrc` file. Suggest to run `nvm use` when you enter the project folder.

### Install packages need for the project ###
Install yarn packages in project root folder first using `yarn install`.

### To start the project ##
Run `yarn dev` in project root folder.

### To build production ###
Run `yarn build` in project root folder.

## Configurations ##
Below shows some available configuration options.

### To add / edit Webpack alias ###
To add or edit Webpack alias, modify `resolve.alias` in `webpack/webpack.base.conf.js`.

### To add Google Tag Manager ID ###
The `APP_GTM_ID` is located in `.env` file.

## Notes ##
Webpack is configured to build and output a single HTML file. 
* `styled-loader` is used instead of `mini-css-extract-plugin` plugin, so styles are output as part of JavaScript bundle
* `./webpack/utils/InlineChunkHtmlPlugin.js` is introduced from `react-dev-utils` to inject JS files as inline chunk
* `postbuild` command will remove `assets` folder after build, which should only contains unnecessary `js` folder inside
