var App = angular.module('app', [
    'lbServices',
    'generalFactory',
    'ui.router'
]);

// App.run(['$rootScope', '$state', '$stateParams',
//     function($rootScope, $state, $stateParams) {
//         $rootScope.$state = $state;
//         $rootScope.$stateParams = $stateParams;
//     }
// ]);

App.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "views/home.html"
            })
            // Kategori Barang
            .state('kategoriBarang', {
                abstract: true,
                url: "/kategori-barang",
                templateUrl: "views/kategoriBarang/index.html",
                controller: 'KategoriBarangCtrl'
            })
            .state('kategoriBarang.list', {
                url: "/list",
                templateUrl: "views/kategoriBarang/list.html",
                controller: 'KategoriBarangListCtrl'
            })
            .state('kategoriBarang.new', {
                url: "/new",
                templateUrl: "views/kategoriBarang/new.html",
                controller: 'KategoriBarangCreateCtrl'
            })
            .state('kategoriBarang.detail', {
                url: "/detail/:id",
                templateUrl: "views/kategoriBarang/detail.html",
                controller: 'KategoriBarangDetailCtrl'
            })
            .state('kategoriBarang.edit', {
                url: "/edit/:id",
                templateUrl: "views/kategoriBarang/edit.html",
                controller: 'KategoriBarangEditCtrl'
            })
            // Barang
            .state('barang', {
                abstract: true,
                url: "/barang",
                templateUrl: "views/barang/index.html",
                controller: 'BarangCtrl'
            })
            .state('barang.list', {
                url: "/list",
                templateUrl: "views/barang/list.html",
                controller: 'BarangListCtrl'
            })
            .state('barang.new', {
                url: "/new",
                templateUrl: "views/barang/new.html",
                controller: 'BarangCreateCtrl'
            })
            .state('barang.detail', {
                url: "/detail/:id",
                templateUrl: "views/barang/detail.html",
                controller: 'BarangDetailCtrl'
            })
            .state('barang.edit', {
                url: "/edit/:id",
                templateUrl: "views/barang/edit.html",
                controller: 'BarangEditCtrl'
            })
    }
]);
