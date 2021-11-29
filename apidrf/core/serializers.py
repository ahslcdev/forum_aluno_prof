from django.core.serializers import serialize
from django.db.models import fields
from rest_framework import serializers
from .models import *


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('first_name', 'last_name', 'username', 'password', 'email')

    # def save(self, commit=True):
    #     user = super(UsuarioSerializer, self).save(commit=False)
    #     user.set_password(self.cleaned_data['password'])
    #     if commit:
    #         user.save()
    #     return user
    # def create(self, vali)


class SalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = ['entrar', 'descricao', 'tags', 'dono']


class CheckSala(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = ['codigo_sala']


class PerguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perguntas
        fields = '__all__'


class PerguntasSerializer(serializers.ModelSerializer):
    id_pergunta = PerguntaSerializer()
    class Meta:
        model = PerguntaSala
        fields = ('data', 'hora', 'id', 'id_pergunta', 'id_sala')
