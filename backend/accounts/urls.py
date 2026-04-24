from django.urls import path
from .views import ContactView, IssueReportView, CaptureTrafficView, test_model, receive_log, get_logs
urlpatterns = [
    path('contact/', ContactView.as_view(), name='contact'),
    path('report/', IssueReportView.as_view(), name='issue-report'),
    path('capture/', CaptureTrafficView.as_view(), name='capture-traffic'),
    path('test-model/', test_model, name='test-model'),
    path("api/logs/", receive_log),
    path("api/logs/get/", get_logs),
]
