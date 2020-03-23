# Webpack + Vue Standalone App Boilerplate 

Sole purpose of this package is to provide a fast, secure and usable boilerplate to create a static prototype for your next big thing (app).

By default we include:
* Vue
* Bulma
* Buefy
* FontAwesome

...or use your other favorite tools.

Optimization and other tools are configured by default (See Run and Compile).

What happens behind the scenes is:
* Vue components are automatically fetched from `src/js/components`
* Image, SCSS and JavaScript assets are automaticly compiled and optimized from `src/img`, `src/js` and `src/scss` folder
* HTML file `index.html` is copied and optimized from `src/index.html` with nessesary asset includes to `public` dist foldder

Simple "Hello World" is provided as an example. Just install and check it out.

Some of the functionality is based and inspired by laravel-mix, however this provides more straight forward approach to any static Vue app.

## Install

`yarn init`  
`yarn add @oddytech/webpack-vue-boilerplate`  
`yarn install`  

## Run and compile

For development environment use the following commands, this will not optimize your assets in anyway for easier debugging
`yarn run development`

For production, staging and demo environments use the following commands, this will optimize your assets and code
`yarn run production`

When running your dist assets will be created to `public` folder where they are served.

## Configure

Use the file `config/webpack.config.js` for any Webpack related configuration.
Include your assets from `src` folder.

### Internationalization

Use i18next and @panter/vue-i18next -package for language support when needed.

Uncomment and add required packages from `bootstrap.js` configuration when using i18next plugin for automated compiling and usage.

### Nginx config

```nginx
server {
    server_name vue-boilerplate.example.com;
    listen 80;

    add_header  X-Robots-Tag "noindex, nofollow, nosnippet, noarchive";

    root /your/web/root//public;

    index index.html;

    gzip_static on;
    gzip_proxied any;
    gzip_types text/plain text/css application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript image/x-icon image/bmp image/svg+xml application/octet-stream;
    gzip_vary on;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    charset utf-8;

    access_log /var/log/nginx/static-access.log;
    error_log /var/log/nginx/static-error.log error;

    location / {
        try_files $uri $uri/;
    }
}
```
