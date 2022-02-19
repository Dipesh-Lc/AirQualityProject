from django.shortcuts import render, redirect  
from crud.forms import CrudForm  
from crud.models import Crud  
# Create your views here.  
def crd(request):  
    if request.method == "POST":  
        form = CrudForm(request.POST)  
        if form.is_valid():  
            try:  
                form.save()  
                return redirect('/show')  
            except:  
                pass  
    else:  
        form = CrudForm()  
    return render(request,'index.html',{'form':form})  
def show(request):  
    datas = Crud.objects.all()  
    return render(request,"show.html",{'datas':datas})  
def edit(request, id):  
    data = Crud.objects.get(id=id)  
    return render(request,'edit.html', {'data':data})  
def update(request, id):  
    data = Crud.objects.get(id=id)  
    form = CrudForm(request.POST, instance = data)  
    if form.is_valid():  
        form.save()  
        return redirect("/show")  
    return render(request, 'edit.html', {'data': data})  
def destroy(request, id):  
    data = Crud.objects.get(id=id)  
    data.delete()  
    return redirect("/show")  