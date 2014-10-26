App.controller('BarangCtrl', ['$scope', '$state', 'KatBarangFac',
    function($scope, $state, KatBarangFac) {
        // Add Title
        $scope.pages = {
            title: 'Manage Barang',
            subtitle: 'Index'
        }
        // Sync Kategori Barang
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

App.controller('BarangListCtrl', ['$scope', '$state', 'Barang', 'KategoriBarang',
    function($scope, $state, Barang, KategoriBarang) {
        $scope.pages.subtitle = 'List';


        function getList() {
            Barang.find().$promise
                .then(function(resBarang) {
                    $scope.listBarang = resBarang;
                }, function(errBarang) {
                    console.log(errBarang.status + ' ' + errBarang.statusText);
                });
        };
        getList();
        // CALLBACK HELL EXAMPLE
        // function addKatBarangById(idx, barangs, next) {
        //     KategoriBarang.findById({
        //         id: barangs[idx].idkategoribarang
        //     }).$promise.then(function(res) {
        //         barangs[idx].kategoriBarang = res;
        //         next(null);
        //     }, function(err) {
        //         barangs[idx].kategoriBarang = {
        //             namakategoribarang: 'N/A'
        //         };
        //         next(err);
        //     });
        // }

        // function getBarang(next) {
        //     Barang.find().$promise.then(function(res) {
        //         for (var i = 0; i <= res.length - 1;) {
        //             console.log(i);
        //             addKatBarangById(i, res, function() {
                      
        //             });
        //         i ++;
        //         };
        //         next(null, res);
        //     }, function(err) {
        //         next(err);

        //     });
        // }

        // function gettestList() {
        //     getBarang(function(err, data) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log(data);
        //         }
        //     });

        // }
        // gettestList();
        // CALLBACK HELL EXAMPLE END

        // Detail View
        $scope.detailView = function(selected) {

            Barang
                .exists(selected)
                .$promise.then(function(results) {
                    $state.go('barang.detail', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    getList();
                });

        }
        // Detail View
        $scope.editView = function(selected) {
            Barang
                .exists(selected)
                .$promise.then(function(results) {
                    $state.go('barang.edit', selected);
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                    getList();
                });



        }
        // Remove Event
        $scope.remove = function(selected) {
            if (confirm('hapus ' + selected.namabarang + ' ?')) {
                Barang
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

App.controller('BarangCreateCtrl', ['$scope', '$state', 'Barang',
    function($scope, $state, Barang) {
        $scope.pages.subtitle = 'Create';
        $scope.newBarang = {};
        // Create Event
        $scope.create = function() {
            Barang
                .create($scope.newBarang)
                .$promise.then(function(results) {
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

        Barang
            .findById($stateParams)
            .$promise.then(function(results) {
                $scope.detailBarang = results;
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });

    }
])

App.controller('BarangEditCtrl', ['$scope', '$state', '$stateParams', 'Barang', 'KatBarangFac',
    function($scope, $state, $stateParams, Barang, KatBarangFac) {
        $scope.pages.subtitle = 'Edit';
        $scope.editBarang = {};


        $scope.KatBarangs = function() {
            var transObj = [];
            _.each(KatBarangFac.get(), function(value, key, list) {

                transObj.push(value);

            });
            return transObj;
        };

        Barang
            .findById($stateParams)
            .$promise.then(function(results) {
                $scope.editBarang = results;
            }, function(err) {
                alert(err.status + ' ' + err.statusText);
            });
        $scope.update = function() {
            Barang
                .prototype$updateAttributes($scope.editBarang)
                .$promise.then(function(results) {
                    $scope.editBarang = {};
                    $state.go('barang.list');
                }, function(err) {
                    alert(err.status + ' ' + err.statusText);
                });
        };
    }
])
