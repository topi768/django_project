import time
import os

while True:
    os.system("python manage.py delete_old_accounts")
    time.sleep(10)  
