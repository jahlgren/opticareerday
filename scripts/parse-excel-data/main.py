# Imports
# --------------------------------------------------

import pandas as pd
import urllib.request
import re
import os
import shutil
import uuid
import codecs

# Config variables
# --------------------------------------------------

output_file = 'output.txt'

excel_file_name = 'Quzzfragor_OCD_2024.xlsx'
excel_sheet_swedish = 'Svenska'
excel_sheet_finnish = 'Finska'

excel_row_skip = 0 # how many rows to skip (ex. header row)

excel_col_company_name = 0
excel_col_logo_url = 1
excel_col_question = 2
excel_col_correct_answer = 3
excel_col_incorrect_answer1 = 4
excel_col_incorrect_answer2 = 5

logos_download_folder = 'logos'

# Main
# --------------------------------------------------

def main():
    print('\n- OptiCareer Day / Parse Excel Data -\n')
    
    try:
        print('Parsing excel file')
        questions = parse_excel_file(excel_file_name, excel_sheet_swedish, excel_sheet_finnish)
        
        print('Clearing folder: ' + logos_download_folder)
        clear_folder(logos_download_folder)
        
        print('Downloading logos..')
        for question in questions:
            question.logo_url = download_logo(question, logos_download_folder)
            print(' ' + question.logo_url)

        sql_questions = get_questions_sql(questions)
        sql_answers = get_answers_sql(questions)
        js_obj = get_js_logos_object(questions)

        # Write output file
        f = codecs.open(output_file, 'w', 'utf-8')
        f.write('### SQL Query for inserting Questions:\n\n' + sql_questions)
        f.write('\n\n### SQL Query for inserting Answers:\n\n' + sql_answers)
        f.write('\n\n### JavaScript object:\n\n' + js_obj)
        f.close()

    except BaseException as error:
        print('ERROR: ', error)
    
    print('\n')

# Helper functions

def to_safe_quotes(value):
    return value.replace('"', '\\"').replace("'", "\\'")

def get_js_logos_object(questions):
    js = 'const companyLogos = [\n'
    for question in questions:
        js += '  { src: "' + question.logo_url + '", name: "' + question.company + '" },\n'
    return js[:-2] + '\n];'

def get_questions_sql(questions):
    sql = 'INSERT INTO question\n  (id, content, company)\nVALUES\n'
    for question in questions:
        sql += '(UNHEX(REPLACE("'+question.id+'", "-","")), \'{"sv":"'+to_safe_quotes(question.swedish)+'","fi":"'+to_safe_quotes(question.finnish)+'"}\', "'+question.company+'"),\n'
    return sql[:-2] + ';'

def get_answers_sql(questions):
    sql = 'INSERT INTO answer\n  (id, content, is_correct, question_id)\nVALUES\n'
    for question in questions:
        for answer in question.answers:
            sql += '(UNHEX(REPLACE("'+answer.id+'", "-","")), \'{"sv":"'+to_safe_quotes(answer.swedish)+'","fi":"'+to_safe_quotes(answer.finnish)+'"}\', '+str(answer.is_correct)+', UNHEX(REPLACE("'+question.id+'", "-",""))),\n'
    return sql[:-2] + ';'

def clear_folder(folder):
    shutil.rmtree(folder)
    os.mkdir(folder)

def parse_excel_file(file, sheet_swedish, sheet_finnish):
    try:
        data_swedish = pd.read_excel(file, sheet_name=sheet_swedish, index_col=None)
        data_finnish = pd.read_excel(file, sheet_name=sheet_finnish, index_col=None)
    except:
        raise Exception('Could not read excel file: ' + file + ', sheets: ' + sheet_swedish + ", " + sheet_finnish)

    swedish_row_count = len(data_swedish)
    finnish_row_count = len(data_finnish)

    questions = []

    if(swedish_row_count is not finnish_row_count):
        raise Exception('Could not parse excel file: ' + file + ', mismatch in row count for sheets: ' + sheet_swedish + ' and ' + sheet_finnish)

    for row_index in range(0, swedish_row_count):
        questions.append(dataframe_to_question(row_index, data_swedish, data_finnish))

    return questions

def download_logo(question, to_folder):
    # define valid file types
    content_type_to_file_type_map = {
        'image/svg+xml': 'svg',
        'image/svg': 'svg',
        'image/png': 'png',
        'image/jpeg': 'jpg'
    }

    # download
    try:
        fullname = to_folder + '/' + question.url_safe_company_name
        opener = urllib.request.build_opener()
        opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
        urllib.request.install_opener(opener)
        response = urllib.request.urlretrieve(question.download_logo_url, fullname) 
        
        file_type = ''
        for item in response[1].items():
            if item[0] == 'Content-Disposition':
                file_type = item[1].rsplit('.', 1)[-1].replace('"', '')
            if file_type == '' and item[0] == 'Content-Type' and item[1] in content_type_to_file_type_map:
                file_type = content_type_to_file_type_map[item[1]]
        
        final_fullname = fullname + '.' + file_type
        os.rename(fullname, final_fullname)
        
        return final_fullname

    except Exception as e:
        raise Exception('Failed to download logo for ' + question.company + ', url: ' + question.download_logo_url)

def dataframe_to_question(row, data_swedish, data_finnish):
    return Question(
        str(data_swedish.iat[row, excel_col_company_name]),
        str(data_swedish.iat[row, excel_col_logo_url]),
        str(data_swedish.iat[row, excel_col_question]),
        str(data_finnish.iat[row, excel_col_question]),
        [
            Answer(
                str(data_swedish.iat[row, excel_col_correct_answer]),
                str(data_finnish.iat[row, excel_col_correct_answer]),
                True
            ),
            Answer(
                str(data_swedish.iat[row, excel_col_incorrect_answer1]),
                str(data_finnish.iat[row, excel_col_incorrect_answer1]),
                False
            ),
            Answer(
                str(data_swedish.iat[row, excel_col_incorrect_answer2]),
                str(data_finnish.iat[row, excel_col_incorrect_answer2]),
                False
            )
        ]
    )

def to_url_safe_name(name):
    return re.sub('[^a-zA-Z\-_]', '', name.lower().replace(' ', '-').replace('å','a').replace('ä','a').replace('ö','o'))

# Classes
# --------------------------------------------------

class Answer:
    def __init__(self, swedish, finnish, is_correct):
        self.id = str(uuid.uuid4())
        self.swedish = swedish
        self.finnish = finnish
        self.is_correct = is_correct

class Question:
    def __init__(self, company, download_logo_url, swedish, finnish, answers):
        self.id = str(uuid.uuid4())
        self.company = company
        self.download_logo_url = download_logo_url
        self.url_safe_company_name = to_url_safe_name(company)
        self.swedish = swedish
        self.finnish = finnish
        self.answers = answers
        self.logo_url = 'undefined' # needs to be computed later..

# Run application
# --------------------------------------------------

if __name__ == "__main__":
    main()
