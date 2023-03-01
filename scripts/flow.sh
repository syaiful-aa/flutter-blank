#!/bin/bash

message="oit"
echo "$OUTPUT1 $OUTPUT2 from inside"
echo "args $1 $2 $3"
echo "test=oey oey" >> "$GITHUB_OUTPUT" 
echo "message=$message" >> "$GITHUB_OUTPUT" 