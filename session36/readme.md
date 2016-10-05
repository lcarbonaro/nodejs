This example illustrates:

- GeoJSON format for map data layers
- Creating a GeoJSON document
- Adding a GeoJSON data layer to a Google map
- MongoDB geospatial queries, such as `$nearSphere`


Notes
-----

To set up the landmarks collection in your own database:

1. Download the file `landmarks.geojson` from this repo; it's about 1.7Mb
2. Make sure MongoDB server is started on your machine
3. In a separate command prompt: `mongoimport --db test --collection lm --file landmarks.geojson`
4. Result from import should say: `imported 2179 documents`
5. Open a MongoDB shell prompt and type in: `db.lm.count()`
6. Above should give 2179, the number of records in the database
7. At the same MongoDB shell prompt: `db.lm.createIndex( { "geometry" : "2dsphere" } )`
8. You must have this index for geospatial queries to work, e.g. `$nearSphere`


References & Resources
----------------------

* [Google Maps API](https://developers.google.com/maps/documentation/javascript/reference)
* [GeoJSON Spec](http://geojson.org)
* [geojson.io](http://geojson.io)
* [MongoDB geospatial querying](https://docs.mongodb.com/manual/reference/operator/query-geospatial/)
* [Open Data Mississauga - Landmarks Dataset](http://data.mississauga.ca/datasets/0ef6b00cb09546caa8e9325787916a9a_0)
* [Ogre: Shapefile-to-geojson online conversion utility](https://ogre.adc4gis.com/)
