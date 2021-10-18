from django.conf.urls import url
from . import views

urlpatterns = [

    url(r'^user$', views.user_api),
    url(r'^user/([0-9]+)$', views.user_api),

    url(r'^group$', views.group_api),
    url(r'^group/([0-9]+)$', views.group_api),

]