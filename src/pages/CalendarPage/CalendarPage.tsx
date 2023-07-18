import React, { useState, useEffect, FC } from 'react';
import TodoCalendar from '../../components/Calendar/TodoCalendar';
import { Todo } from '../../types/Todo';
import { fetchTodos } from '../../lib/api';

const CalendarPage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await fetchTodos()) as Todo[];
        setTodos(response);
      } catch (error) {
        console.error('Failed to fetch data: ', error);
      }
    };

    // fetchDataを即時関数として呼び出す
    (async () => {
      await fetchData();
    })();
  }, []);

  return (
    <div>
      <TodoCalendar todos={todos} />
      {selectedDate && (
        <div>
          <h1>{selectedDate.toDateString()}</h1>
          {selectedTodos.map((todo) => (
            <div key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
