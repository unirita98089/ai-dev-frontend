import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../lib/api';
import { User } from '../../types/User';

function SamplePage() {
  // ユーザデータの状態を管理します
  const [users, setUsers] = useState<User[]>([]);

  // コンポーネントがマウントされた後にAPIからデータをフェッチします
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = (await fetchUsers()) as User[];
        setUsers(result);
      } catch (error) {
        console.error('Failed to fetch data: ', error);
      }
    };

    // fetchDataを即時関数として呼び出す
    (async () => {
      await fetchData();
    })();
  }, []); // 依存配列が空なので、この副作用はコンポーネントのマウント時に一度だけ実行されます

  return (
    <div className="Sample">
      <h1>Sample</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SamplePage;
