App.controller('KategoriBarangCtrl', ['$scope', '$state',
    function($scope, $state) {
        // Add Title
        $scope.pages = {
            title: 'Manage Kategori Barang',
            subtitle: 'Index'
        }

    }
])

App.controller('KategoriBarangListCtrl', ['$scope', '$state', 'KategoriBarang',
    function($scope, $state, KategoriBarang) {
        $scope.pages.subtitle = 'List';
        $scope.listBarang = [];

        // get List
        function getList() {
            KategoriBarang.find()
                .$promise.then(function(res) {
                    $scope.listKategoriBarang = res;
                }, function(err) {
                    console.log(err.status + ' ' + err.statusText);
                });
        }
        getList();
        // Detail View
        $scope.detailView = function(selected) {

            KategoriBarang.exists(selected)
                .$promise.then(function(res) {
                    $state.go('kategoriBarang.detail', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    getList();
                });

        }
        // Detail View
        $scope.editView = function(selected) {
            KategoriBarang
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('kategoriBarang.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    getList();
                });



        }
        // Remove Event
        $scope.remove = function(selected) {
            if (confirm('hapus ' + selected.namakategoribarang + ' ?')) {
                KategoriBarang
                    .deleteById(selected)
                    .$promise.then(function() {
                        getList();
                    });
            } else {
                return;
            }

        };
    }
])

App.controller('KategoriBarangCreateCtrl', ['$scope', '$state', 'KategoriBarang', 
    function($scope, $state, KategoriBarang) {
        $scope.pages.subtitle = 'Create';
        $scope.newKategoriBarang = {};
        // Create Event
        $scope.create = function() {
            KategoriBarang
                .create($scope.newKategoriBarang)
                .$promise.then(function(res) {
                    $scope.newKategoriBarang = {};
                    $state.go('kategoriBarang.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });

        };

    }
])

App.controller('KategoriBarangDetailCtrl', ['$scope', '$state', '$stateParams', 'KategoriBarang', 
    function($scope, $state, $stateParams, KategoriBarang) {
        $scope.pages.subtitle = 'Detail';
        KategoriBarang
            .findById($stateParams)
            .$promise.then(function(res) {
                $scope.detailKategoriBarang = res;
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });

    }
])

App.controller('KategoriBarangEditCtrl', ['$scope', '$state', '$stateParams', 'KategoriBarang',
    function($scope, $state, $stateParams, KategoriBarang) {
        $scope.pages.subtitle = 'Edit';
        $scope.editKategoriBarang = {};
        KategoriBarang
            .findById($stateParams)
            .$promise.then(function(res) {
                $scope.editKategoriBarang = res;
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        $scope.update = function() {
            KategoriBarang
                .prototype$updateAttributes($scope.editKategoriBarang)
                .$promise.then(function(res) {
                    $scope.editKategoriBarang = {};
                    $state.go('kategoriBarang.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });
        };
    }
])
