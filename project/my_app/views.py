from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return HttpResponse("Hello, home!")

def say_hallo(request):
    return render(request, "hello.html", {'name': 'vasya'})
