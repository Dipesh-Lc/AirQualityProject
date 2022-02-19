from django import forms  
from crud.models import Crud  
class CrudForm(forms.ModelForm):  
    class Meta:  
        model = Crud  
        fields = "__all__"  