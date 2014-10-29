App.controller('PindahBarangCtrl', ['$scope', '$state', 'Barang', 'Lokasi', 'KatBarangFac',
    function($scope, $state, Barang, Lokasi, KatBarangFac) {
        // Add Title
        $scope.pages = {
            title: 'Manage Pindah Barang',
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
            DariLokasis: 0,
            KeLokasis: 0
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
     

    }
])

App.controller('PindahBarangListCtrl', ['$scope', '$state', 'PindahBarang',
    function($scope, $state, PindahBarang) {
        $scope.pages.subtitle = 'List';


        $scope.getList = function() {
            // Kosongkan dulu objeknya
            $scope.listPindahBarang = {};

            var fil = {
                'filter[include]': ['barang', 'dariLokasi', 'keLokasi'],

            };
            if ($scope.filter.Barangs > 0) {
                fil['filter[where][idbarang]'] = $scope.filter.Barangs;
            }
            if ($scope.filter.DariLokasis > 0) {
                fil['filter[where][iddarilokasi]'] = $scope.filter.DariLokasis;
            }
            if ($scope.filter.KeLokasis > 0) {
                fil['filter[where][idkelokasi]'] = $scope.filter.KeLokasis;
            }
            PindahBarang.find(fil).$promise
                .then(function(res) {
                    $scope.listPindahBarang = res;
                  
                }, function(err) {
                    console.log(err.status + ' ' + err.statusText);
                });
        };
        $scope.getList();




        // Detail View
        $scope.detailView = function(selected) {

            PindahBarang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('pindahBarang.detail', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });

        }
        // Detail View
        $scope.editView = function(selected) {
            PindahBarang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('pindahBarang.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
        // Remove Event
        $scope.remove = function(selected) {
            if (confirm('hapus ' + selected.id + ' ?')) {
                PindahBarang
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

App.controller('PindahBarangCreateCtrl', ['$scope', '$state', 'PindahBarang',
    function($scope, $state, PindahBarang) {
        $scope.pages.subtitle = 'Create';
        $scope.newPindahBarang = {};
        // Create Event
        $scope.create = function() {
            PindahBarang
                .create($scope.newPindahBarang)
                .$promise.then(function(res) {
                    $scope.newPindahBarang = {};
                    $state.go('pindahBarang.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });

        };

    }
])

App.controller('PindahBarangDetailCtrl', ['$scope', '$state', '$stateParams', 'PindahBarang',
    function($scope, $state, $stateParams, PindahBarang) {
        $scope.pages.subtitle = 'Detail';
        var fil = {
            'filter[where][id]': $stateParams.id,
            'filter[include]': ['barang', 'dariLokasi', 'keLokasi'],
        };
        PindahBarang.find(fil).$promise
            .then(function(res) {
                $scope.detailPindahBarang = res[0];
                $scope.detailPindahBarang.tanggalpindah = new Date(res[0].tanggalpindah);
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        // Detail View
        $scope.editView = function(selected) {
            PindahBarang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('pindahBarang.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });

        }
    }
])


App.controller('PindahBarangEditCtrl', ['$scope', '$state', '$stateParams', 'PindahBarang',
    function($scope, $state, $stateParams, PindahBarang) {
        $scope.pages.subtitle = 'Edit';
        $scope.editPindahBarang = {};

        PindahBarang
            .findById($stateParams)
            .$promise.then(function(res) {
                $scope.editPindahBarang = res;
                $scope.editPindahBarang.tanggalpindah = new Date(res.tanggalpindah);
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });


        $scope.update = function() {
            PindahBarang
                .prototype$updateAttributes($scope.editPindahBarang)
                .$promise.then(function(res) {
                    $scope.editPindahBarang = {};
                    $state.go('pindahBarang.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });
        };
    }
])
