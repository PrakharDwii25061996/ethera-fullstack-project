
from core.views import ListCreateEmployeeAPIView, AttendanceCreateListAPIView, LoginView
from django.urls import path

urlpatterns = [
    path("login/", LoginView.as_view()),
    path('employee', ListCreateEmployeeAPIView.as_view(), name='employee'),
    path('attendance', AttendanceCreateListAPIView.as_view(), name='attendance')
]
