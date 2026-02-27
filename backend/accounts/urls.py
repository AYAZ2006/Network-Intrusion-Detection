from django.urls import path
from .views import ContactView, IssueReportView
urlpatterns = [
    path('contact/', ContactView.as_view(), name='contact'),
    path('report/', IssueReportView.as_view(), name='issue-report'),
]
