import json
import plotly.express as px
from collections import Counter

# Загрузка данных из файла results.json
with open('results.json', 'r') as f:
    data = [json.loads(line) for line in f]

# Собираем время и продолжительность запроса
durations = []
timestamps = []

for item in data:
    if item.get('metric') == 'http_req_duration' and item.get('type') == 'Point':
        timestamp = item['data']['time']
        duration = item['data']['value']  # продолжительность запроса в миллисекундах
        timestamps.append(timestamp)
        durations.append(duration)

# Подсчитываем количество пользователей (запросов), сделанных в определённые промежутки времени
duration_counter = Counter(durations)

# Создаем DataFrame для визуализации
import pandas as pd

df = pd.DataFrame(duration_counter.items(), columns=["Request Duration (ms)", "User Count"])

# Строим график с помощью Plotly
fig = px.scatter(df, x="Request Duration (ms)", y="User Count", 
                 title="Количество пользователей по времени выполнения запроса",
                 labels={"Request Duration (ms)": "Время запроса (ms)", "User Count": "Количество пользователей"})

fig.show()
