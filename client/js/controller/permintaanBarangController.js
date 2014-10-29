App.controller('PermintaanBarangCtrl', ['$scope', '$state', 'Barang', 'Lokasi', 'KatBarangFac', 'LokasiFac',
    function($scope, $state, Barang, Lokasi, KatBarangFac, LokasiFac) {
        // Add Title
        $scope.pages = {
            title: 'Manage Permintaan Barang',
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
        LokasiFac.sync();

        $scope.getNamaKatBarang = function(idkategoribarang) {
            var dataKatBarang = KatBarangFac.get();
            if (dataKatBarang[idkategoribarang]) {
                return dataKatBarang[idkategoribarang].nama;
            } else {
                return 'N/A';
            };
        }
        $scope.getNamaLokasi = function(idlokasi) {
            var dataLokasi = LokasiFac.get();
            if (dataLokasi[idlokasi]) {
                return dataLokasi[idlokasi].nama;
            } else {
                return 'N/A';
            };
        }
      

    }
])

App.controller('PermintaanBarangListCtrl', ['$scope', '$state', 'PermintaanBarang',
    function($scope, $state, PermintaanBarang) {
        $scope.pages.subtitle = 'List';


        $scope.getList = function() {
            // Kosongkan dulu objeknya
            $scope.listPermintaanBarang = {};

            var fil = {
                'filter[include]': ['barang', 'lokasi', 'pindahBarang', 'rencanaPembelian'],

            };
            if ($scope.filter.Barangs > 0) {
                fil['filter[where][idbarang]'] = $scope.filter.Barangs;
            }
            if ($scope.filter.Lokasis > 0) {
                fil['filter[where][idlokasi]'] = $scope.filter.Lokasis;
            }
            PermintaanBarang.find(fil).$promise
                .then(function(res) {
                    $scope.listPermintaanBarang = res;
                  
                }, function(err) {
                    console.log(err.status + ' ' + err.statusText);
                });
        };
        $scope.getList();




        // Detail View
        $scope.detailView = function(selected) {

            PermintaanBarang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('permintaanBarang.detail', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });

        }
        // Detail View
        $scope.editView = function(selected) {
            PermintaanBarang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('permintaanBarang.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
        // Remove Event
        $scope.remove = function(selected) {
            if (confirm('hapus ' + selected.id + ' ?')) {
                PermintaanBarang
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

App.controller('PermintaanBarangCreateCtrl', ['$scope', '$state', 'PermintaanBarang',
    function($scope, $state, PermintaanBarang) {
        $scope.pages.subtitle = 'Create';
        $scope.newPermintaanBarang = {};
        // Create Event
        $scope.create = function() {
            PermintaanBarang
                .create($scope.newPermintaanBarang)
                .$promise.then(function(res) {
                    $scope.newPermintaanBarang = {};
                    $state.go('permintaanBarang.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });

        };

    }
])

App.controller('PermintaanBarangDetailCtrl', ['$scope', '$state', '$stateParams', 'PermintaanBarang',
    function($scope, $state, $stateParams, PermintaanBarang) {
        $scope.pages.subtitle = 'Detail';
        var fil = {
            'filter[where][id]': $stateParams.id,
            'filter[include]': ['barang', 'lokasi']
        };
        PermintaanBarang.find(fil).$promise
            .then(function(res) {
                $scope.detailPermintaanBarang = res[0];
                $scope.detailPermintaanBarang.tglmasuk = new Date(res[0].tglmasuk);
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        // Detail View
        $scope.editView = function(selected) {
            PermintaanBarang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('permintaanBarang.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });

        }
    }
])

App.controller('PermintaanBarangEditCtrl', ['$scope', '$state', '$stateParams', 'PermintaanBarang',
    function($scope, $state, $stateParams, PermintaanBarang) {
        $scope.pages.subtitle = 'Edit';
        $scope.editPermintaanBarang = {};

        PermintaanBarang
            .findById($stateParams)
            .$promise.then(function(res) {
                $scope.editPermintaanBarang = res;
                $scope.editPermintaanBarang.tglmasuk = new Date(res.tglmasuk);
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });


        $scope.update = function() {
            PermintaanBarang
                .prototype$updateAttributes($scope.editPermintaanBarang)
                .$promise.then(function(res) {
                    $scope.editPermintaanBarang = {};
                    $state.go('permintaanBarang.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });
        };
    }
])
