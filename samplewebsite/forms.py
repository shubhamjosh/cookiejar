from django import forms


class login(forms.Form):
    username = forms.EmailField(required=False, label='username', max_length=100,
                                widget=forms.TextInput(
                                    attrs={'class': 'form-control', 'placeholder': 'username', 'required': 'true'}))
    password = forms.CharField(required=True, label='password', max_length=200,
                               widget=forms.PasswordInput(
                                   attrs={'class': 'form-control', 'placeholder': 'password'}))


class Signup(forms.Form):
    username = forms.CharField(required=False, label='username', max_length=100,
                               widget=forms.TextInput(
                                   attrs={'class': 'form-control', 'placeholder': 'username', 'required': 'true'}))

    email = forms.EmailField(required=False, label='username', max_length=100,
                             widget=forms.TextInput(
                                 attrs={'class': 'form-control', 'placeholder': 'email', 'required': 'true'}))

    password = forms.CharField(required=True, label='password', max_length=200,
                               widget=forms.PasswordInput(
                                   attrs={'class': 'form-control', 'placeholder': 'password'}))
