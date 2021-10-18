from django.db import models


class Group(models.Model):
    """
            Model representing info about group (id, name, description)."""

    name = models.CharField(max_length=30, help_text='Enter user name', unique=True)
    description = models.TextField(max_length=1000, help_text="Enter a description of the group")

    def __str__(self):
        return self.name


class User(models.Model):
    """
        Model representing info about user (name, date of creation, group)."""

    name = models.CharField(max_length=30, help_text='Enter user name', unique=True)
    group = models.ForeignKey(Group, on_delete=models.PROTECT, help_text="Select a group for this user")
    date = models.DateField(auto_now=True, editable=False)

    def __str__(self):
        return self.name
