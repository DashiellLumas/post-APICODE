
## Setup Instructions
&nbsp;
##### Download zip file
&nbsp;
##### Download jq
Windows Users: see https://stedolan.github.io/jq/download/
Mac Users: (Install Homebrew)
``
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null
``
&nbsp;
``
brew install jq
``
&nbsp;
##### Next
&nbsp;
##### run ``npm install``
&nbsp;
##### Next
&nbsp;
To convert csv to json:
##### run ``jq -R -s -f -j csv2json.jq data.csv > output.json``
&nbsp;
##### Next
To post object(s) to Kustomer API:
###### run ``npm run post ``
