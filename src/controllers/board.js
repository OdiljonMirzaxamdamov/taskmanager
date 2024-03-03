import LoadMoreButtonComponent from "../components/load-more-button.js";
import NoTasksComponent from "../components/no-task.js";
import SortComponent, {SortType} from "../components/sort.js";
import TaskComponent from "../components/task.js";
import TaskEditComponent from "../components/task-edit.js";
import TasksComponent from "../components/tasks.js";
import {remove, render, replace, RenderPosition} from "../utils/render.js";


const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }


  render(tasks) {
    // Функция для отображения кнопки "Показать еще"
    const renderLoadMoreButton = () => {
      // Проверяем, не превышено ли количество отображаемых задач
      if (showingTasksCount >= tasks.length) {
        return;
      }

      // Отображаем кнопку "Показать еще" перед списком задач
      render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      // Устанавливаем обработчик клика на кнопку "Показать еще"
      this._loadMoreButtonComponent.setClickHandler(() => {
        // Запоминаем количество отображенных задач до клика
        const prevTasksCount = showingTasksCount;
        // Увеличиваем количество отображаемых задач
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        // Получаем отсортированные задачи с учетом типа сортировки
        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);

        // Отображаем задачи после клика
        renderTasks(taskListElement, sortedTasks);
      });

      // Если отображены все задачи, удаляем кнопку "Показать еще"
      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    };

    // Получаем контейнер для отображения компонентов
    const container = this._container.getElement();

    // Проверяем, все ли задачи архивированы
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    // Если все задачи архивированы, отображаем сообщение об отсутствии задач
    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Отображаем компонент сортировки
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    // Отображаем компонент списка задач
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);
    // Получаем элемент списка задач
    const taskListElement = this._tasksComponent.getElement();

    // Начальное количество отображаемых задач
    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    // Отображаем начальный список задач
    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    // Отображаем кнопку "Показать еще"
    renderLoadMoreButton();

    // Устанавливаем обработчик изменения типа сортировки
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      // Сбрасываем количество отображаемых задач до стандартного значения
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      // Получаем отсортированные задачи с учетом нового типа сортировки
      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      // Очищаем список задач
      taskListElement.innerHTML = ``;

      // Отображаем отсортированные задачи
      renderTasks(taskListElement, sortedTasks);
      // Отображаем кнопку "Показать еще"
      renderLoadMoreButton();
    });

  }
}
