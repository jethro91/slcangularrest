var App = angular.module('app', [
    'lbServices',
    'generalFactory',
    'ui.router',
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
            // Lokasi
            .state('lokasi', {
                abstract: true,
                url: "/lokasi",
                templateUrl: "views/lokasi/index.html",
                controller: 'LokasiCtrl'
            })
            .state('lokasi.list', {
                url: "/list",
                templateUrl: "views/lokasi/list.html",
                controller: 'LokasiListCtrl'
            })
            .state('lokasi.new', {
                url: "/new",
                templateUrl: "views/lokasi/new.html",
                controller: 'LokasiCreateCtrl'
            })
            .state('lokasi.detail', {
                url: "/detail/:id",
                templateUrl: "views/lokasi/detail.html",
                controller: 'LokasiDetailCtrl'
            })
            .state('lokasi.edit', {
                url: "/edit/:id",
                templateUrl: "views/lokasi/edit.html",
                controller: 'LokasiEditCtrl'
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
            // Barang Masuk
            .state('barangMasuk', {
                abstract: true,
                url: "/barang-masuk",
                templateUrl: "views/barangMasuk/index.html",
                controller: 'BarangMasukCtrl'
            })
            .state('barangMasuk.list', {
                url: "/list",
                templateUrl: "views/barangMasuk/list.html",
                controller: 'BarangMasukListCtrl'
            })
            .state('barangMasuk.new', {
                url: "/new",
                templateUrl: "views/barangMasuk/new.html",
                controller: 'BarangMasukCreateCtrl'
            })
            .state('barangMasuk.detail', {
                url: "/detail/:id",
                templateUrl: "views/barangMasuk/detail.html",
                controller: 'BarangMasukDetailCtrl'
            })
            .state('barangMasuk.edit', {
                url: "/edit/:id",
                templateUrl: "views/barangMasuk/edit.html",
                controller: 'BarangMasukEditCtrl'
            })
            // Permintaan Barang
            .state('permintaanBarang', {
                abstract: true,
                url: "/permintaan-barang",
                templateUrl: "views/permintaanBarang/index.html",
                controller: 'PermintaanBarangCtrl'
            })
            .state('permintaanBarang.list', {
                url: "/list",
                templateUrl: "views/permintaanBarang/list.html",
                controller: 'PermintaanBarangListCtrl'
            })
            .state('permintaanBarang.new', {
                url: "/new",
                templateUrl: "views/permintaanBarang/new.html",
                controller: 'PermintaanBarangCreateCtrl'
            })
            .state('permintaanBarang.detail', {
                url: "/detail/:id",
                templateUrl: "views/permintaanBarang/detail.html",
                controller: 'PermintaanBarangDetailCtrl'
            })
            .state('permintaanBarang.edit', {
                url: "/edit/:id",
                templateUrl: "views/permintaanBarang/edit.html",
                controller: 'PermintaanBarangEditCtrl'
            })
            // Pindah Barang
            .state('pindahBarang', {
                abstract: true,
                url: "/pindah-barang",
                templateUrl: "views/pindahBarang/index.html",
                controller: 'PindahBarangCtrl'
            })
            .state('pindahBarang.list', {
                url: "/list",
                templateUrl: "views/pindahBarang/list.html",
                controller: 'PindahBarangListCtrl'
            })
            .state('pindahBarang.new', {
                url: "/new",
                templateUrl: "views/pindahBarang/new.html",
                controller: 'PindahBarangCreateCtrl'
            })
            .state('pindahBarang.detail', {
                url: "/detail/:id",
                templateUrl: "views/pindahBarang/detail.html",
                controller: 'PindahBarangDetailCtrl'
            })
            .state('pindahBarang.edit', {
                url: "/edit/:id",
                templateUrl: "views/pindahBarang/edit.html",
                controller: 'PindahBarangEditCtrl'
            })
            // Rencana Pembelian
            .state('rencanaPembelian', {
                abstract: true,
                url: "/rencana-pembelian",
                templateUrl: "views/rencanaPembelian/index.html",
                controller: 'RencanaPembelianCtrl'
            })
            .state('rencanaPembelian.list', {
                url: "/list",
                templateUrl: "views/rencanaPembelian/list.html",
                controller: 'RencanaPembelianListCtrl'
            })
            .state('rencanaPembelian.new', {
                url: "/new",
                templateUrl: "views/rencanaPembelian/new.html",
                controller: 'RencanaPembelianCreateCtrl'
            })
            .state('rencanaPembelian.detail', {
                url: "/detail/:id",
                templateUrl: "views/rencanaPembelian/detail.html",
                controller: 'RencanaPembelianDetailCtrl'
            })
            .state('rencanaPembelian.edit', {
                url: "/edit/:id",
                templateUrl: "views/rencanaPembelian/edit.html",
                controller: 'RencanaPembelianEditCtrl'
            })
    }
]);
