If not the first setup time, run :

```
rm -rf config.ini motis* data/*
```

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
