import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // APIのベースURL
  timeout: 1000, // リクエストのタイムアウト時間
  headers: {
    'Content-Type': 'application/json',
    // 必要に応じて他のヘッダーを設定
  },
});

export default apiClient;
