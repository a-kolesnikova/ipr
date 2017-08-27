require.config({
    baseUrl: 'boot',
    paths: {
        // Libraries
        "jquery": "../../bower_components/jquery/dist/jquery",
        "knockout": "../../bower_components/knockout/dist/knockout",
        "text": "../../bower_components/requirejs-text/text",
        "init": "init",
        "amplify": "../../bower_components/amplify/lib/amplify.min",
        "core": "../../app/core/getDataService",

        // Components
        "header": "../components/header/header",
        "footer": "../components/footer/footer",
        "products-list": "../components/products-list/products-list",
        "sidebar": "../components/sidebar/sidebar",
        "toolbar": "../components/toolbar/toolbar"
    },
    shim: {
        "amplify": {
            deps: ["jquery"],
            exports: "amplify"
        }
    }
});

require(["jquery", "knockout", "amplify", "init", "core", "data"]);




