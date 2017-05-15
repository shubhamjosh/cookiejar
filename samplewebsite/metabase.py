# You'll need to install PyJWT via pip 'pip install PyJWT' or your project packages file

import jwt

METABASE_SITE_URL = "http://0.0.0.0:3000"
METABASE_SECRET_KEY ="4168d393495f22af9fa7d51177fe8646a969309002cdab41c903a3b3712a044b"


def metabase_birthdays():
    payload = {
        "resource": {"question": 1},
        "params": {

        }
    }
    token = jwt.encode(payload, METABASE_SECRET_KEY, algorithm="HS256")
    return METABASE_SITE_URL + "/embed/question/" + str(token,
                                                        encoding='UTF-8') + "#theme=night&bordered=true&titled=true"
