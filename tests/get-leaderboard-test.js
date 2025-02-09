import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

// k6 run get-leaderboard-test.js
const BASE_URL = 'http://localhost:8000/api/get_leaderboard/';

export let options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 250 },
    // { duration: '5s', target: 800 },
    // { duration: '5s', target: 1000 },
    // { duration: '5s', target: 10000 },
    // { duration: '5s', target: 50000 },

  ],
};

export default function () {
  // Отправляем GET-запрос на эндпоинт /api/get-leaderboard/
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

  // Проверка, что ответ содержит хотя бы один элемент (например, leaderboard)
  check(res, {
    'response contains leaderboard data': (r) => r.json().length > 0,
  });

  // Дополнительная проверка на содержимое, например, что каждый элемент содержит id и имя игрока
  check(res, {
    'all entries have id and name': (r) => {
      const leaderboard = r.json();
      return leaderboard.every(entry => entry.id && entry.name);
    },
  });

  // Задержка между запросами
  sleep(1);
}
