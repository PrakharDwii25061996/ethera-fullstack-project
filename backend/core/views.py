from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from .models import Employee, CustomUser, Attendance
from .serializers import EmployeeCreateDeleteSerializer, AttendanceSerializer, LoginSerializer

from django.views.decorators.csrf import ensure_csrf_cookie


class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():

            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            user = authenticate(request, email=email, password=password)
            # user = authenticate(request, username=email, password=password)

            if user is not None:
                login(request, user)   # session created
                return Response({
                    "message": "Login Successfull",
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'is_superuser': user.is_superuser
                    },
                    'status': status.HTTP_200_OK
                    },
                    status=status.HTTP_200_OK
                )
            
            return Response({
                        "message": "Please Enter valid email or password",
                        'status': status.HTTP_200_OK
                    },
                    status=status.HTTP_200_OK
                )
        return Response({
                "message": "Login Unsuccessfull",
                'errors': serializer.errors,
                'status': status.HTTP_200_OK
            },
            status=status.HTTP_200_OK
        )


class ListCreateEmployeeAPIView(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """

    def post(self, request, *args, **kwargs):
        """
        Return a list of all users.
        """
        serializer = EmployeeCreateDeleteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "success",
                'data': serializer.data,
                'status': status.HTTP_201_CREATED
                },
                status=status.HTTP_201_CREATED
            )
        return Response({
                "message": "failed",
                'data': serializer.errors,
                'status': status.HTTP_200_OK
            },
            status=status.HTTP_200_OK
        )

    def get(self, request, *args, **kwargs):
        emmployee_list = Employee.objects.all()
        serializer = EmployeeCreateDeleteSerializer(emmployee_list, many=True)
        return Response({
                "message": "Employee list",
                'data': serializer.data,
                'status': status.HTTP_200_OK
                },
                status=status.HTTP_200_OK
            )

    def delete(self, request, *args, **kwargs):
        employee_id = request.query_params.get('employee_id')
        employee = Employee.objects.filter(employee_id = employee_id).last()
        if not employee:
          return Response({"message": "Please Enter Correct Employee ID."})

        employee.delete()
        return Response({
            "message": f"Successfully Deleted Employee {employee_id}",
            'status': status.HTTP_204_NO_CONTENT
          },
          status=status.HTTP_204_NO_CONTENT
        )


@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"message": "CSRF cookie set"})


class AttendanceCreateListAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Attendance Created",
                'data': serializer.data,
                'status': status.HTTP_201_CREATED
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {

                "message": "Attendance Not Created",
                'data': serializer.errors,
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    def get(self, request, *args, **kwargs):
        employee_id = request.query_params.get('employee_id')
        if employee_id:
            attendance_list = Attendance.objects.filter(employee__employee_id=str(employee_id))
        else:
            attendance_list = Attendance.objects.all()

        attendance_serializer = AttendanceSerializer(attendance_list, many=True)
        return Response({
            "message": "Attendance List",
            'data': attendance_serializer.data,
            'status': status.HTTP_200_OK
            },
            status=status.HTTP_200_OK
        )





