from django.shortcuts import render
from django.views.generic import TemplateView

from .forms import login
from .metabase import metabase_birthdays


class Login(TemplateView):
    Welcome = "Hi welcome to page"

    def get(self, request):
        form = login()
        iframeUrl = metabase_birthdays()
        return render(request, 'newtheme/master/base.html', {'form': form, 'iframeUrl': iframeUrl})

    def post(self, request, *args, **kwargs):
        form = login()
        username = request.POST.get('username')
        password = request.POST.get('password')
        # form = self.form_class(request.POST)
        return render(request, 'user/login.html', {'form': form})
