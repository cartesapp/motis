#!/bin/bash
cd /root/motis
#I had problems with flixbus and blabla, couldn't know where it came from
#since nigiri is very fast, we remove its cache just in case
rm ./data/nigiri/*
./motis/motis --server.port 3000
