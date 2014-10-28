App.controller('LokasiCtrl', ['$scope', '$state',
    function($scope, $state) {
        // Add Title
        $scope.pages = {
            title: 'Manage Lokasi',
            subtitle: 'Index'
        }

    }
])

App.controller('LokasiListCtrl', ['$scope', '$state', 'Lokasi',
    function($scope, $state, Lokasi) {
        $scope.pages.subtitle = 'List';
        $scope.listlokasi = [];

        // get List
        $scope.getList = function() {
            Lokasi.find()
                .$promise.then(function(res) {
                    $scope.listLokasi = res;
                }, function(err) {
                    console.log(err.status + ' ' + err.statusText);
                });
        }
        $scope.getList();
        // Detail View
        $scope.detailView = function(selected) {

            Lokasi.exists(selected)
                .$promise.then(function(res) {
                    $state.go('lokasi.detail', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });

        }
        // Detail View
        $scope.editView = function(selected) {
            Lokasi
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('lokasi.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
        // Remove Event
        $scope.remove = function(selected) {
            if (confirm('hapus ' + selected.namalokasi + ' ?')) {
                Lokasi
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

App.controller('LokasiCreateCtrl', ['$scope', '$state', 'Lokasi',
    function($scope, $state, Lokasi) {
        $scope.pages.subtitle = 'Create';
        $scope.newLokasi = {};
        // Create Event
        $scope.create = function() {
            Lokasi
                .create($scope.newLokasi)
                .$promise.then(function(res) {
                    $scope.newLokasi = {};
                    $state.go('lokasi.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });

        };

    }
])

App.controller('LokasiDetailCtrl', ['$scope', '$state', '$stateParams', 'Lokasi',
    function($scope, $state, $stateParams, Lokasi) {
        $scope.pages.subtitle = 'Detail';
        Lokasi
            .findById($stateParams)
            .$promise.then(function(res) {
                $scope.detailLokasi = res;
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        // Detail View
        $scope.editView = function(selected) {
            Lokasi
                .exists(selected)
                .$promise.then(function(res) {
                    $state.go('lokasi.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    $scope.getList();
                });



        }
    }
])

App.controller('LokasiEditCtrl', ['$scope', '$state', '$stateParams', 'Lokasi',
    function($scope, $state, $stateParams, Lokasi) {
        $scope.pages.subtitle = 'Edit';
        $scope.editLokasi = {};
        Lokasi
            .findById($stateParams)
            .$promise.then(function(res) {
                $scope.editLokasi = res;
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        $scope.update = function() {
            Lokasi
                .prototype$updateAttributes($scope.editLokasi)
                .$promise.then(function(res) {
                    $scope.editLokasi = {};
                    $state.go('lokasi.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });
        };
    }
])
