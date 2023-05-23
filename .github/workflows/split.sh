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
echo "${optionsSplitted[@]}"

branches=(master dev prod)
JSON="["
for branch in ${branches[@]}; do
    echo $branch
    JSONline="\"$branch\","
    # we don't need to iterate on the same branch over and over, so
    # onnly include it when it wasn't included
    if [[ "$JSON" != *"$JSONline"* ]]; then
        JSON="$JSON$JSONline"
    fi
done

# Remove last "," and add the closing bracket
if [[ $JSON == *, ]]; then
    JSON="${JSON%?}"
fi
JSON="$JSON]"

echo $JSON