var generalFactory = angular.module('generalFactory', ['lbServices']);

generalFactory.factory('KatBarangFac', ['KategoriBarang',
    function(KategoriBarang) {
        var katBarangArr = {};
        return {
            sync: function(cb) {

                KategoriBarang.find().$promise.then(function(data) {
                    _.each(data, function(value, key, list) {

                        katBarangArr[value.id] = {
                            id: value.id,
                            nama: value.namakategoribarang
                        }

                    });
                    console.log(katBarangArr);
                    if(cb){
                    	cb();
                    }
                    
                }, function(err) {
         			
                });


            },
            get: function() {
                return katBarangArr;
            }

        };
    }
])

