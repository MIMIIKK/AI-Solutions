from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

class APIRootTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root_accessible(self):
        """
        Test that the API root is accessible
        """
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('solutions', response.data)
        self.assertIn('testimonials', response.data)
        self.assertIn('articles', response.data)
        self.assertIn('events', response.data)
        self.assertIn('inquiries', response.data)

    def test_health_check(self):
        """
        Test that the health check endpoint returns a success response
        """
        url = reverse('health-check')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'healthy')