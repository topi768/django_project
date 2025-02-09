import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

//  k6 run get-levels-test.js
//  k6 run --out json=results.json get-levels-test.js

const BASE_URL = 'http://localhost:8000/api/get-levels/';

export let options = {
    stages: [
      { duration: '5s', target: 50 }, 
      { duration: '5s', target: 100 }, // держим 100 пользователей в течение 5 секунд
      { duration: '5s', target: 250 }, // держим 10 пользователей в течение 30 секунд

      // { duration: '5s', target: 500 }, 
      // { duration: '5s', target: 700 },
      // { duration: '5s', target: 900 },
      // { duration: '5s', target: 1000 },
    ],
  }

export default function () {
  // Отправляем GET-запрос на эндпоинт /api/get-levels/
  const res = http.get(BASE_URL);

  // Проверяем, что статус ответа 200 и время отклика меньше 200ms
  check(res, {
    'is status 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
    "body is not empty": (r) => r.json() && r.json().length > 0,

  });

  // Задержка между запросами, чтобы нагрузка не была слишком высокой
  sleep(1);
}
