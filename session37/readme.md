This repo consists of two examples.

Example 1 builds on the example from the previous session by adding:

- user input (for centre, landmark, distance) to the front-end 
- server routes to the back-end which handle those inputs

Example 2 illustrates:

- MongoDB geospatial query `$geoIntersects`


Notes
-----

To set up the ward collection in your own database:

1. Download the file `ward.geojson` from this repo; it's about 306Kb
2. Make sure MongoDB server is started on your machine
3. In a separate command prompt: `mongoimport --db test --collection ward --file ward.geojson`
4. Result from import should say: `imported 11 documents`
5. Open a MongoDB shell prompt and type in: `db.ward.count()`
6. Above should give 11, the number of records in the database
7. At the same MongoDB shell prompt: `db.ward.createIndex( { "geometry" : "2dsphere" } )`
8. You must have this index for geospatial queries to work, e.g. `$geoIntersects`


References & Resources
----------------------

* [Google Maps API docs](https://developers.google.com/maps/documentation/javascript/reference)
* [Google API Key](https://console.developers.google.com)
* [geojson.org: GeoJSON Spec](http://geojson.org)
* [geojson.io: Utility to build geojson datasets interactively](http://geojson.io)
* [MongoDB geospatial querying](https://docs.mongodb.com/manual/reference/operator/query-geospatial/)
* [Open Data Mississauga - Ward Boundaries Dataset](http://data.mississauga.ca/datasets/d6392baad3b5443cb124f5f677e834a2_0)
* [Ogre: shapefile-to-geojson online conversion utility](https://ogre.adc4gis.com/)
