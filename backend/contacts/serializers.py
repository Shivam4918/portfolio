from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'ip_address', 'is_read', 'created_at']
        read_only_fields = ['id', 'ip_address', 'is_read', 'created_at']

    def validate_name(self, value):
        val = value.strip()
        if len(val) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        if len(val) > 100:
            raise serializers.ValidationError("Name cannot exceed 100 characters.")
        return val

    def validate_subject(self, value):
        val = value.strip()
        if len(val) < 5:
            raise serializers.ValidationError("Subject must be at least 5 characters long.")
        if len(val) > 200:
            raise serializers.ValidationError("Subject cannot exceed 200 characters.")
        return val

    def validate_message(self, value):
        val = value.strip()
        if len(val) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        if len(val) > 2000:
            raise serializers.ValidationError("Message cannot exceed 2000 characters.")
        return val
