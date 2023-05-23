#! /usr/bin/bash

# for file in $(find . -type f -name "analyze_output"); 
#     do if [ -s $file ]; then
#         cat "$file" >> analyze_output_all
#         echo "" >> analyze_output_all
#     fi
# done

for file in $(find . -type f -name "analyze_output")
do if [ -s $file ]; then
    cat "$file" >> analyze_output_all 
    echo "" >> analyze_output_all
fi
done
resultprint="$(cat 'analyze_output_all')"
echo "$resultprint"