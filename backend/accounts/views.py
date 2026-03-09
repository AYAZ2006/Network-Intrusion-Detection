from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ContactSerializer,IssueReportSerializer
from django.core.mail import send_mail
from rest_framework import status
class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            name = serializer.data['name']
            email = serializer.data['email']
            message = serializer.data['message']
            admin_message = f"""
            New Contact Enquiry:
            Name: {name}
            Email: {email}
            Message:
            {message}
"""
            send_mail(subject=f"New Contact Form Submission from {name}",message=admin_message,from_email="hajrasultana7075@gmail.com",recipient_list=["hajrasultana7075@gmail.com"],fail_silently=False,)
            send_mail(subject="Thanks for contacting us",
                message=(
                    "Thank you for reaching out to us.\n\n"
                    "We've received your message and our team has started reviewing your inquiry. "
                    "One of our support members will get back to you as soon as possible.\n\n"
                    "In the meantime, feel free to explore our platform for job listings, internships, "
                    "and other opportunities tailored to your needs.\n\n"
                    "Check out https://jobleloo.vercel.app/ while we resolve your request."
                ),from_email="hajrasultana7075@gmail.com",recipient_list=[email],fail_silently=False,)
            return Response({"message": "Message received and email sent"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IssueReportView(APIView):
    def post(self, request):
        serializer = IssueReportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            summary = serializer.data['summary']
            severity = serializer.data['severity']
            description = serializer.data['description']
            admin_message = f"""
            New Issue Report Submitted:
            Summary: {summary}
            Severity: {severity}
            Description:
            {description}
            """
            send_mail(subject=f"New Issue Report - {severity.upper()}",message=admin_message,from_email="hajrasultana7075@gmail.com",recipient_list=["hajrasultana7075@gmail.com"],fail_silently=False,)
            return Response({"message": "Issue reported successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import threading
from .utils import capture_and_save_csv

class CaptureTrafficView(APIView):
    def post(self, request):
        duration = int(request.data.get("duration", 120))
        output_file = request.data.get("output_file", "traffic.csv")
        
        capture_and_save_csv(duration, output_file)
        
        return Response({
            "message": f"Traffic capture started for {duration} seconds. CSV will be saved as {output_file}."
        })
    
import os
from django.conf import settings
from django.http import JsonResponse
from .predictor import predict_csv


def test_model(request):

    csv_path = os.path.join(settings.BASE_DIR, "traffic.csv")

    df = predict_csv(csv_path)

    # count results
    result_counts = df["prediction"].value_counts().to_dict()

    return JsonResponse({
        "total_flows": len(df),
        "results": result_counts
    })