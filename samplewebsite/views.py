from django.shortcuts import render
from django.views.generic import TemplateView

from .forms import login, Signup
from .metabase import metabase_birthdays


class Login(TemplateView):
    Welcome = "Hi welcome to page"

    def get(self, request):
        form_login = login()
        form_signup = Signup()

        iframeUrl = metabase_birthdays()
        return render(request, 'newtheme/master/landingpage.html',
                      {'form_login': form_login, 'form_signup': form_signup, 'iframeUrl': iframeUrl})

    def post(self, request, *args, **kwargs):
        form = login()
        username = request.POST.get('username')
        password = request.POST.get('password')
        # form = self.form_class(request.POST)
        return render(request, 'user/login.html', {'form': form})


class SignUp(TemplateView):
    def get(self, request):
        form = Signup()
        return render(request, 'registration/signup.html', {'form': form})
