import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTaskTemplate} from "./components/task";
import {createTaskEditTemplate} from "./components/task-edit";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";


// константные значения
const TASK_COUNT = 22;
const SHOWING_TASK_COUNT_ON_START = 7;
const SHOWING_TASK_COUNT_BY_BUTTON = 8;


// рендер функция
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


// рендерим меню сайта
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, createSiteMenuTemplate());


// рендерим фильтры
const filters = generateFilters();
render(siteMainElement, createFilterTemplate(filters));


// рендерим блок основного контента
render(siteMainElement, createBoardTemplate());


// рендерим перый блок задач редактор
const tasks = generateTasks(TASK_COUNT);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate(tasks[0]));


// рендерим блоки задач
let showingTasksCount = SHOWING_TASK_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));


// рендерим кнопки "показать больше"
const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());


// отслеживаем кнопку и рендерим ещё больше задач
const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASK_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
