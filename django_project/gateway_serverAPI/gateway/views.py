import requests
from django.http import JsonResponse
from django.shortcuts import redirect

FIRST_SERVER_URL = 'http://127.0.0.1:8000'

def gateway_home(request):
    return redirect(FIRST_SERVER_URL)

def gateway_view(request, path):
    url = f'{FIRST_SERVER_URL}/{path}'

    headers = dict(request.headers)
    headers['Accept'] = 'application/json'

    response = requests.get(url, params=request.GET, headers=headers)

    try:
        json_data = response.json()
        return JsonResponse(json_data, safe=False)
    except ValueError:
        return JsonResponse({'error': 'Invalid JSON from server'}, status=500)
