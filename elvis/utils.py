import re

import pandas as pd


def get_entity_name_from_id(entity_id):
    return entity_id


def tac_results_reader(result_file_path, additional_column=False):
    yield ['Mention_String', 'Doc_Id', 'Begin', 'End', 'Mention', 'KBID', 'Entity_Type', 'Mention_Type']
    with open(result_file_path) as f:
        for line in f.readlines():
            source, mention_id, mention_string, doc_id_span, kbid, entity_type, mention_type = line.split('\t')[:7]
            doc_id, start, end = re.split('\:|\-', doc_id_span)
            yield [mention_string, doc_id, start, end, doc_id_span, kbid, entity_type, mention_type]


def get_mentions_info(path: str, additional_column=False):
    mentions_info = pd.DataFrame(tac_results_reader(path, additional_column))
    mentions_info.columns = mentions_info.iloc[0]
    mentions_info.drop(0, inplace=True)
    mentions_info.reindex()
    return mentions_info


def transform_tac_to_html(tac_html: str):
    tac_html = tac_html.replace('<headline>', '<p><b>')
    tac_html = tac_html.replace('</headline>', '</b></p>')
    tac_html = tac_html.replace('<HEADLINE>', '<p><b>')
    tac_html = tac_html.replace('</HEADLINE>', '</b></p>')
    tac_html = tac_html.replace('<SOURCE>', '<p>')
    tac_html = tac_html.replace('</SOURCE>', '</p>')
    tac_html = re.sub('<post id=".*" author="', '<div class="panel panel-default "><div class="panel-body">', tac_html)
    tac_html = re.sub('" datetime=".*">', '', tac_html)
    tac_html = tac_html.replace('</post>', '</div></div>')
    tac_html = tac_html.replace('<quote', '<p class="alert alert-warning" ')
    tac_html = tac_html.replace('</quote>', '</p>')
    return tac_html
