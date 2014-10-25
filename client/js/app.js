var App = angular.module('app', [
    'lbServices',
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
    }
]);
