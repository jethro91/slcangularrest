var fs = require('fs');
var server = require('./server');
var dataSource = server.dataSources.einventorydb;

var file_content = fs.readFileSync('./model-config.json');
var content = JSON.parse(file_content);

dataSource.discoverModelDefinitions({
    all: true,
    owner: 'einventory',
    views: false
}, function(err, models) {
    if (err) throw err;
    models.forEach(function(def) {

        dataSource.discoverSchema(def.name, {
            owner: def.owner
        }, function(er, schema) {
            if (er) throw er;


            var fname = schema.name.charAt(0).toLowerCase() + schema.name.slice(1);
            var schemaString = JSON.stringify(schema, null, '  ');

            fs.writeFile('../common/models/' + fname + '.json', schemaString, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('The file was ' + fname + '.json saved!');
                }
            });

            var scriptSchema = 'module.exports = function(' + fname + ') {};';

            fs.writeFile('../common/models/' + fname + '.js', scriptSchema, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('The file was ' + fname + '.js saved!');
                }
            });


            content[schema.name] = {
                'dataSource': 'einventorydb',
                'public': true
            };


            fs.writeFileSync('./model-config.json', JSON.stringify(content));


        });
    });
});