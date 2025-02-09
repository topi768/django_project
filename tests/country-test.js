import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

// URL для API с country_code 'RU'
const BASE_URL = 'http://localhost:8000/api/countryList';

export let options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 250 },
  ],
};

export default function () {
  // Отправляем GET-запрос на эндпоинт /api/cities/RU/
  const res = http.get(BASE_URL);

  // Проверка статуса ответа
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Проверка времени отклика
  check(res, {
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Проверка размера ответа
  check(res, {
    'response size < 1MB': (r) => r.body.length < 1000000,  // 1 MB = 1,000,000 байт
  });

  // Проверка, что ответ содержит хотя бы один элемент (например, города)
  check(res, {
    'response contains cities data': (r) => r.json().length > 0,
  });



  // Задержка между запросами
  sleep(1);
}
