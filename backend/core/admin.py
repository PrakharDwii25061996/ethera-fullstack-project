
from django.contrib import admin
from .models import CustomUser, Employee, Attendance

admin.site.register(CustomUser)
admin.site.register(Employee)

admin.site.register(Attendance)
