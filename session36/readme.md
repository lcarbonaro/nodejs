This example illustrates:

- GeoJSON format for map data layers
- Creating a GeoJSON document
- Adding a GeoJSON data layer to a Google map
- MongoDB geospatial queries, such as `$nearSphere`


Notes
-----

To set up the landmarks collection in your own database:

1. download the file `landmarks.geojson`
2. make sure MongoDB server is started on your machine
3. in a separate command prompt: `mongoimport --db test --collection lm --file landmarks.geojson`
4. result from import should say: `imported 2179 documents`
5. open a MongoDB shell prompt and type in: `db.lm.count()`
6. above should give 2179, the number of records in the database
7. at the same MongoDB shell prompt: `db.lm.createIndex( { "geometry" : "2dsphere" } )`
8. This index is required for the geospatial queries, e.g. `$nearSphere`.


References & Resources
----------------------

* [Google Maps API](https://developers.google.com/maps/documentation/javascript/reference)
* [GeoJSON Spec](http://geojson.org)
* [geojson.io](http://geojson.io)
* [MongoDB geospatial querying](https://docs.mongodb.com/manual/reference/operator/query-geospatial/)
