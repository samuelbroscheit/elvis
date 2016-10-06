# Path in which source_docs and the gold_standard are stored
#
# For example:
#
# corpora_path = '/home/bla/Projects/Entity_Linking/Data/Corpora/LDC2016E38_TAC_KBP_Entity_Discovery_and_Linking_Comprehensive_Training_and_Evaluation_Data_2014-2015/data/2015/eval'
#

corpora_path = ''

# Path in which the folders eng,spa,cmn are located the source format (i.e. not the ltf.xml files)
#
# For example:
#
# documents_path = '/source_docs'
#

documents_path = '/source_docs'

# Path to the gold mentions
#
# For example:
#
# gold_info_path = corpora_path + '/tac_kbp_2015_tedl_evaluation_gold_standard_entity_mentions.tab'
#

gold_info_path = corpora_path + '/tac_kbp_2015_tedl_evaluation_gold_standard_entity_mentions.tab'

# File name pattern to select the system output files
#
# For example if your files are named entity_linking_out_001.tsv, entity_linking_out_002.tsv, ...
#
# system_output_file_name = 'entity_linking_out_*.tsv'
#

system_output_file_name = ''

# Path in which your entity linking system outputs in the TAC 2015 format are stored.
# It is assumed that the files are to be found in subdirectories below system_output_path
#
# system_output_path / * / system_output_file_name
#
# For example:
#
# system_output_path = '/home/bla/Projects/Entity_Linking/Data/Evaluation'
#
# The following files will be found:
#
# /home/bla/Projects/Entity_Linking/Data/Evaluation/20160816-1610/entity_linking_out_001.tsv
# /home/bla/Projects/Entity_Linking/Data/Evaluation/20160816-1610/entity_linking_out_002.tsv
# /home/bla/Projects/Entity_Linking/Data/Evaluation/20160816-1710/entity_linking_out_001.tsv
# ...
#

system_output_path = ''

#
# Host and Port for the web server to run on
#

host = None
port = 33507
