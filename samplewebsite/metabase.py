# You'll need to install PyJWT via pip 'pip install PyJWT' or your project packages file

import jwt

METABASE_SITE_URL = "http://0.0.0.0:3000"
METABASE_SECRET_KEY = "f06aa398894a3e24c9c645d22198f7eb8bd7c5d4c7f2375ad6e44108274b8dd2"


def metabase_birthdays():
    payload = {
        "resource": {"question": 1},
        "params": {

        }
    }
    token = jwt.encode(payload, METABASE_SECRET_KEY, algorithm="HS256")
    return METABASE_SITE_URL + "/embed/question/" + str(token,
                                                        encoding='UTF-8') + "#theme=night&bordered=true&titled=true"
