#!/usr/bin/env python

import json
from watson_developer_cloud import ConversationV1

username = '';
password = '';
conversation = ConversationV1(
    username=username,
    password=password,
    version='2016-07-11')

workspace_id = ''

response = conversation.message(workspace_id=workspace_id, message_input={'text': 'Are there any parks around here?'})

print(json.dumps(response, indent=2))

