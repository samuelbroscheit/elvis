# elvis

Very lightweight annotation visualization for the EDL branch of TAC 2015/2016, just to 
share something small and usefull with the community. This project was only a quick 
and dirty helper for error analysis and is not intended to evolve into some full blown 
visualization tool. 

Start by completing the configuration in elvis/config.py. 

Start the server with

$ ./main.py

Only tested on Linux. Requires Python3, pandas and flask.

To resolve the KBIDs to something human readable implement the function get_entity_name_from_id(entity_id) in utils.py.

Known issues that I probably wont fix:

 - Does not handle overlapping but not embedding mention spans correctly. 
 - Clicking on mentions with embedded mentions leads to multiple conflicting popups. 
