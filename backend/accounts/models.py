from django.db import models
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class IssueReport(models.Model):
    SEVERITY_CHOICES = [('low', 'Low'),('medium', 'Medium'),('high', 'High'),('critical', 'Critical'),]
    summary = models.CharField(max_length=255)
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.summary} ({self.severity})"
