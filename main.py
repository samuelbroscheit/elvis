#!/usr/bin/env python3

from elvis import config
from elvis import elvis

if __name__ == '__main__':
    elvis.app.run(host=config.host, port=config.port,threaded=True)