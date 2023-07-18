import React, { useState, useEffect } from 'react';
import { FC } from 'react';
import Calendar from 'react-calendar'; // react-calendarパッケージをインストールしてください。
import { Todo } from '../../types/Todo';
import 'react-calendar/dist/Calendar.css';
import './TodoCalendar.css';

type Props = {
  todos: Todo[];
};

const TodoCalendar: FC<Props> = ({ todos }) => {
  // ...以下に、react-calendarのカスタマイズ部分を書きます。
  // 例えば、各日付のToDoを表示したり、期日が近いToDoを強調表示したりする部分です。

  const getTileClassName = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): string | null => {
    if (view !== 'month') {
      return null;
    }

    const dateStr = date.toISOString().split('T')[0];

    const matchingTodos = todos.filter((todo) => todo.date === dateStr);

    if (matchingTodos.length === 0) {
      return null;
    }

    const today = new Date();
    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);
    const nearDeadline = matchingTodos.some((todo) => {
      const todoDate = new Date(todo.date);
      return today <= todoDate && todoDate <= twoDaysLater;
    });
    const completed = matchingTodos.every((todo) => todo.status === '完了');

    if (nearDeadline) {
      return 'todo-date-near-deadline';
    }

    if (completed) {
      return 'todo-date-completed';
    }

    return 'todo-date';
  };

  return (
    <Calendar
      tileClassName={getTileClassName}
      tileContent={({ date, view }) => {
        if (view !== 'month') {
          return null;
        }

        const dateStr = date.toISOString().split('T')[0];
        const matchingTodos = todos.filter((todo) => todo.date === dateStr);

        return (
          <ul className="todo-list">
            {matchingTodos.map((todo) => (
              <li key={todo.id}>
                <h2 className="todo-title">{todo.title}</h2>
              </li>
            ))}
          </ul>
        );
      }}
    />
  );
};

export default TodoCalendar;
