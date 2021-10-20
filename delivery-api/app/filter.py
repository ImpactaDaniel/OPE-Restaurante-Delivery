from urllib import parse


def query_to_dict(url):
    
    return dict(parse.parse_qsl(parse.urlsplit(url).query))