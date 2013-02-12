#!/usr/bin/env bash

cd ./tpl/templates/
for i in $( ls *.tpl );
do
	rm ${i/.tpl/}.tpl
done
cd ../../

cd ./haml/
for i in $( ls *.haml );
do
	echo ${i/.haml/}.haml
	haml -f html5 ${i/.haml/}.haml ../tpl/templates/${i/.haml/}.tpl
done
cd ../