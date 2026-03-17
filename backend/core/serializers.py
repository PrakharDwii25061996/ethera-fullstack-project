from rest_framework import serializers
from .models import CustomUser, Employee, Attendance


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class EmployeeCreateDeleteSerializer(serializers.ModelSerializer):

	class Meta:
		model = Employee
		fields = '__all__'

	def validate_email(self, value):
		if not value.endswith('@gmail.com'):
			raise serializers.ValidationError("Please Enter valid email id.")
		return value


class AttendanceSerializer(serializers.ModelSerializer):
	employee_name = serializers.SerializerMethodField()

	class Meta:
		model = Attendance
		fields = ['id', 'date', 'status', 'employee', 'employee_name']

	def get_employee_name(self, attendance):
		return attendance.employee.full_name
