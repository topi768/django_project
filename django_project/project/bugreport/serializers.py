# bugreport/serializers.py
from rest_framework import serializers
from .models import BugReport

class BugReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = BugReport
        fields = ['id', 'description', 'file', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        # Привязка к текущему пользователю
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)
