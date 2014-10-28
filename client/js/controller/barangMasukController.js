App.controller('BarangMasukCtrl', ['$scope', '$state', 'Barang', 'Lokasi', 'KatBarangFac',
    function($scope, $state, Barang, Lokasi, KatBarangFac) {
        // Add Title
        $scope.pages = {
            title: 'Manage Barang Masuk',
            subtitle: 'Index'
        }

        Barang.find()
            .$promise.then(function(res) {
                $scope.Barangs = res;

            }, function(err) {
                console.log(err.status + ' ' + err.statusText);
            });

        Lokasi.find()
            .$promise.then(function(res) {
                $scope.Lokasis = res;

            }, function(err) {
                console.log(err.status + ' ' + err.statusText);
            });

        $scope.filter = {
            KatBarangs: 0,
            Barangs: 0,
            Lokasis: 0
        }

        // Cara Pake Factory
        KatBarangFac.sync();

        $scope.getNamaKatBarang = function(idkategoribarang) {
            var dataKatBarang = KatBarangFac.get();
            if (dataKatBarang[idkategoribarang]) {
                return dataKatBarang[idkategoribarang].nama;
            } else {
                return 'N/A';
            };
        }
        // Untuk Select Kategori Barang
        // $scope.KatBarangs = function() {
        //     var transObj = [];
        //     _.each(KatBarangFac.get(), function(value, key, list) {
        //         transObj.push(value);
        //     });
        //     return transObj;
        // };

    }
])

App.controller('BarangMasukListCtrl', ['$scope', '$state', 'BarangMasuk',
    function($scope, $state, BarangMasuk) {
        $scope.pages.subtitle = 'List';


        $scope.getList = function() {
            // Kosongkan dulu objeknya
            $scope.listBarangMasuk = {};

            var fil = {
                'filter[include]': ['barang', 'lokasi'],

            };
            if ($scope.filter.Barangs > 0) {
                fil['filter[where][idbarang]'] = $scope.filter.Barangs;
            }
            if ($scope.filter.Lokasis > 0) {
                fil['filter[where][idlokasi]'] = $scope.filter.Lokasis;
            }
            BarangMasuk.find(fil).$promise
                .then(function(res) {
                    $scope.listBarangMasuk = res;
                    console.log(res);
                }, function(err) {
                    console.log(err.status + ' ' + err.statusText);
                });
        };
        $scope.getList();




        // Detail View
        $scope.detailView = function(selected) {

            BarangMasuk
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('barangMasuk.detail', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });

        }
        // Detail View
        $scope.editView = function(selected) {
            BarangMasuk
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('barangMasuk.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
        // Remove Event
        $scope.remove = function(selected) {
            if (confirm('hapus ' + selected.id + ' ?')) {
                BarangMasuk
                    .deleteById(selected)
                    .$promise.then(function() {
                        $scope.getList();
                    });
            } else {
                return;
            }

        };
    }
])

App.controller('BarangMasukCreateCtrl', ['$scope', '$state', 'BarangMasuk',
    function($scope, $state, BarangMasuk) {
        $scope.pages.subtitle = 'Create';
        $scope.newBarangMasuk = {};
        // Create Event
        $scope.create = function() {
            BarangMasuk
                .create($scope.newBarangMasuk)
                .$promise.then(function(res) {
                    $scope.newBarangMasuk = {};
                    $state.go('barangMasuk.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });

        };

    }
])

App.controller('BarangMasukDetailCtrl', ['$scope', '$state', '$stateParams', 'BarangMasuk',
    function($scope, $state, $stateParams, BarangMasuk) {
        $scope.pages.subtitle = 'Detail';
        var fil = {
            'filter[where][id]': $stateParams.id,
            'filter[include]': ['barang', 'lokasi']
        };
        BarangMasuk.find(fil).$promise
            .then(function(res) {
                $scope.detailBarangMasuk = res[0];
                $scope.detailBarangMasuk.tglmasuk = new Date(res[0].tglmasuk);
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        // Detail View
        $scope.editView = function(selected) {
            BarangMasuk
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('barangMasuk.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
    }
])

App.controller('BarangMasukEditCtrl', ['$scope', '$state', '$stateParams', 'BarangMasuk',
    function($scope, $state, $stateParams, BarangMasuk) {
        $scope.pages.subtitle = 'Edit';
        $scope.editBarangMasuk = {};

        BarangMasuk
            .findById($stateParams)
            .$promise.then(function(res) {
                $scope.editBarangMasuk = res;
                $scope.editBarangMasuk.tglmasuk = new Date(res.tglmasuk);
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });


        $scope.update = function() {
            BarangMasuk
                .prototype$updateAttributes($scope.editBarangMasuk)
                .$promise.then(function(res) {
                    $scope.editBarangMasuk = {};
                    $state.go('barangMasuk.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });
        };
    }
])
