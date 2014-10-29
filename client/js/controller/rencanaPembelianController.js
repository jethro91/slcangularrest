App.controller('RencanaPembelianCtrl', ['$scope', '$state', 'Barang', 'KatBarangFac',
    function($scope, $state, Barang, KatBarangFac) {
        // Add Title
        $scope.pages = {
            title: 'Manage Rencana Pembelian',
            subtitle: 'Index'
        }

        Barang.find()
            .$promise.then(function(res) {
                $scope.Barangs = res;

            }, function(err) {
                console.log(err.status + ' ' + err.statusText);
            });

        $scope.filter = {
            KatBarangs: 0,
            Barangs: 0,
          
        }

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

App.controller('RencanaPembelianListCtrl', ['$scope', '$state', 'RencanaPembelian',
    function($scope, $state, RencanaPembelian) {
        $scope.pages.subtitle = 'List';


        $scope.getList = function() {
            // Kosongkan dulu objeknya
            $scope.listRencanaPembelian = {};

            var fil = {
                'filter[include]': ['barang'],

            };
            if ($scope.filter.Barangs > 0) {
                fil['filter[where][idbarang]'] = $scope.filter.Barangs;
            }
            
            RencanaPembelian.find(fil).$promise
                .then(function(res) {
                    $scope.listRencanaPembelian = res;
                   
                }, function(err) {
                    console.log(err.status + ' ' + err.statusText);
                });
        };
        $scope.getList();




        // Detail View
        $scope.detailView = function(selected) {

            RencanaPembelian
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('rencanaPembelian.detail', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });

        }
        // Detail View
        $scope.editView = function(selected) {
            RencanaPembelian
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('rencanaPembelian.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
        // Remove Event
        $scope.remove = function(selected) {
            if (confirm('hapus ' + selected.id + ' ?')) {
                RencanaPembelian
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

App.controller('RencanaPembelianCreateCtrl', ['$scope', '$state', 'RencanaPembelian',
    function($scope, $state, RencanaPembelian) {
        $scope.pages.subtitle = 'Create';
        $scope.newRencanaPembelian = {};
        // Create Event
        $scope.create = function() {
            RencanaPembelian
                .create($scope.newRencanaPembelian)
                .$promise.then(function(res) {
                    $scope.newRencanaPembelian = {};
                    $state.go('rencanaPembelian.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });

        };

    }
])

App.controller('RencanaPembelianDetailCtrl', ['$scope', '$state', '$stateParams', 'RencanaPembelian',
    function($scope, $state, $stateParams, RencanaPembelian) {
        $scope.pages.subtitle = 'Detail';
        var fil = {
            'filter[where][id]': $stateParams.id,
            'filter[include]': ['barang']
        };
        RencanaPembelian.find(fil).$promise
            .then(function(res) {
                $scope.detailRencanaPembelian = res[0];
            
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        // Detail View
        $scope.editView = function(selected) {
            RencanaPembelian
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('rencanaPembelian.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
    }
])

App.controller('RencanaPembelianEditCtrl', ['$scope', '$state', '$stateParams', 'RencanaPembelian',
    function($scope, $state, $stateParams, RencanaPembelian) {
        $scope.pages.subtitle = 'Edit';
        $scope.editRencanaPembelian = {};

        RencanaPembelian
            .findById($stateParams)
            .$promise.then(function(res) {
                $scope.editRencanaPembelian = res;
              
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });


        $scope.update = function() {
            RencanaPembelian
                .prototype$updateAttributes($scope.editRencanaPembelian)
                .$promise.then(function(res) {
                    $scope.editRencanaPembelian = {};
                    $state.go('rencanaPembelian.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });
        };
    }
])
