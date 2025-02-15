from django.db import models

from new_app.models import UserAccount

class BugReport(models.Model):
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='bug_reports/', null=True, blank=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)

    def __str__(self):
        return self.description[:50]