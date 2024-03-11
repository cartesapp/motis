wget https://download.geofabrik.de/europe/france/bretagne-latest.osm.pbf -O input/bretagne.osm.pbf
wget https://download.geofabrik.de/europe/france/pays-de-la-loire-latest.osm.pbf -O input/pays-de-la-loire.osm.pbf
wget https://download.geofabrik.de/europe/france/auvergne-latest.osm.pbf -O input/auvergne.osm.pbf
wget https://download.geofabrik.de/europe/france/rhone-alpes-latest.osm.pbf -O input/rhone-alpes.osm.pbf

cd input
osmium merge bretagne.osm.pbf pays-de-la-loire.osm.pbf auvergne.osm.pbf rhone-alpes.osm.pbf -o cartes.osm.pbf
cd ..
