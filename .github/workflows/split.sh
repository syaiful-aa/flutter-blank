#!/bin/bash

rawInput="/build dev --debug, dev --release"
input=${rawInput///""}

IFS=" " read -ra inputSplitted <<< "$input"
action=${inputSplitted[0]}
options=${input/$action/""}

echo $action
echo $options

IFS="," read -ra optionsSplitted <<< "$options"
for option in "${optionsSplitted[@]}"; do
  echo $option
done