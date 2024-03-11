If not the first setup time, optionally run this command to start from scratch (will be slower, obviously) :

```
rm -rf config.ini motis* data/*
```

> Important note : motis config.ini generation and GTFS downloading has been moved to laem/gtfs

Then

```
./downloadGtfs.sh
```

Then, setup Motis, it should take < 1 minute on an i7 16 Go laptop.

```
./setup.sh
```

Then to just run in one second the server,

```
./motis/motis --server.port 3000
```

Motis startup should take 1 second :)

## About osm files

There should be only one import osm path.

In case you want to include multiple French regions, e.g. run :

```
cd input
osmium merge bretagne.osm.pbf pays-de-la-loire.osm.pbf -o cartes.osm.pbf
```

## Deploying

I've not yet been able to find an easy to use PaaS platform letting me deploy this.

Scalingo has too small images (1,5Go, we're at 1,9Go on Bretagne). Fly.io has no wget, lol. Platform.sh has a weird read-only build files constraint.

Hence I went with a scaleway VM. Using this guide to get a HTTPS certificate https://devtutorial.io/how-to-install-lets-encrypt-ssl-in-nginx-on-ubuntu-23-04-p3269.html

Also

```
sudo apt install lbzip2
```

Your nginx file should look like this

```
server {
    server_name motis.cartes.app;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/motis.cartes.app/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/motis.cartes.app/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = motis.cartes.app) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name motis.cartes.app;
    return 404; # managed by Certbot

```

Then follow the setup above.

Run the server with

```
systemctl start motis.service
```

Read the last logs with

```
journalctl -u motis.service -b -e
```
