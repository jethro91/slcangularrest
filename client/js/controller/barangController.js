App.controller('BarangCtrl', ['$scope', '$state', 'KategoriBarang',
    function($scope, $state, KategoriBarang) {
        // Add Title
        $scope.pages = {
            title: 'Manage Barang',
            subtitle: 'Index'
        }

        KategoriBarang.find()
            .$promise.then(function(res) {
                $scope.KatBarangs = res;

            }, function(err) {
                console.log(err.status + ' ' + err.statusText);
            });

        $scope.filter = {
            KatBarangs: 0
        }





    }
])

App.controller('BarangListCtrl', ['$scope', '$state', 'Barang',
    function($scope, $state, Barang) {
        $scope.pages.subtitle = 'List';


        $scope.getList = function() {
            // Kosongkan dulu objeknya
            $scope.listBarang = {};

            var fil = {
                'filter[include]': 'kategoriBarang'
            };
            if ($scope.filter.KatBarangs > 0) {
                fil['filter[where][idkategoribarang]'] = $scope.filter.KatBarangs;
            }
            Barang.find(fil).$promise
                .then(function(res) {
                    $scope.listBarang = res;
                }, function(err) {
                    console.log(err.status + ' ' + err.statusText);
                });
        };
        $scope.getList();




        // Detail View
        $scope.detailView = function(selected) {

            Barang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('barang.detail', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });

        }
        // Detail View
        $scope.editView = function(selected) {
            Barang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('barang.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
        // Remove Event
        $scope.remove = function(selected) {
            if (confirm('hapus ' + selected.namabarang + ' ?')) {
                Barang
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

App.controller('BarangCreateCtrl', ['$scope', '$state', 'Barang',
    function($scope, $state, Barang) {
        $scope.pages.subtitle = 'Create';
        $scope.newBarang = {};
        // Create Event
        $scope.create = function() {
            Barang
                .create($scope.newBarang)
                .$promise.then(function(res) {
                    $scope.newBarang = {};
                    $state.go('barang.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });

        };

    }
])

App.controller('BarangDetailCtrl', ['$scope', '$state', '$stateParams', 'Barang',
    function($scope, $state, $stateParams, Barang) {
        $scope.pages.subtitle = 'Detail';
        var fil = {
            'filter[where][id]': $stateParams.id,
            'filter[include]': 'kategoriBarang'
        };
        Barang.find(fil).$promise
            .then(function(res) {
                $scope.detailBarang = res[0];
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        // Detail View
        $scope.editView = function(selected) {
            Barang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('barang.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
    }
])

App.controller('BarangEditCtrl', ['$scope', '$state', '$stateParams', 'Barang',
    function($scope, $state, $stateParams, Barang) {
        $scope.pages.subtitle = 'Edit';
        $scope.editBarang = {};


        Barang
            .findById($stateParams)
            .$promise.then(function(res) {
                $scope.editBarang = res;
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        $scope.update = function() {
            Barang
                .prototype$updateAttributes($scope.editBarang)
                .$promise.then(function(res) {
                    $scope.editBarang = {};
                    $state.go('barang.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });
        };
    }
])
