from django.db import models

class Project(models.Model):
    _id = models.AutoField(primary_key=True ,editable=False)
    name = models.CharField(max_length=250)
    description = models.TextField()
    image = models.ImageField(null=True,blank=True)
    createdAt = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    goal = models.IntegerField()
    progress = models.IntegerField()
    createdAt = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
