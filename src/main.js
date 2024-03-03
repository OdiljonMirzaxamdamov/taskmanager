import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterComponent from "./components/filter.js";
import SiteMenuComponent from "./components/site-menu.js";
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";
import {render, RenderPosition} from "./utils/render.js";


const TASK_COUNT = 5;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);


// 4-лекция архив -------------------------------------------------------
// import BoardComponent from "./components/board.js";
// import FilterComponent from "./components/filter.js";
// import LoadMoreButtonComponent from "./components/load-more-button.js";
// import SiteMenuComponent from "./components/site-menu.js";
// import SortComponent from "./components/sort.js";
// import TaskEditComponent from "./components/task-edit.js";
// import TaskComponent from "./components/task.js";
// import TasksComponent from "./components/tasks.js";
// import {generateFilters} from "./mock/filter.js";
// import {generateTasks} from "./mock/task.js";
// import {render, RenderPosition} from "./utils.js";
//
// // константные значения
// const TASK_COUNT = 22;
// const SHOWING_TASKS_COUNT_ON_START = 7;
// const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
//
//
// // Функция для рендеринга задач
// const renderTask = (taskListElement, task) => {
//   const onEditButtonClick = () => {
//     taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
//   };
//
//   const onEditFormSubmit = (evt) => {
//     evt.preventDefault();
//     taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
//   };
//
//   const taskComponent = new TaskComponent(task);
//   const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
//   editButton.addEventListener(`click`, onEditButtonClick);
//
//   const taskEditComponent = new TaskEditComponent(task);
//   const editForm = taskEditComponent.getElement().querySelector(`form`);
//   editForm.addEventListener(`submit`, onEditFormSubmit);
//
//   render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
// };
//
//
// // Функция для рендеринга БЛОКА задач
// const renderBoard = (boardComponent, tasks) => {
//
//   // рендерим три кнопки для сортировки
//   render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
//   // рендерим ДИВ для Таксков
//   render(boardComponent.getElement(), new TasksComponent().getElement(), RenderPosition.BEFOREEND);
//
//
//   // рендерим сами задачи для начального окна в количестве SHOWING_TASKS_COUNT_ON_START
//   const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
//   let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
//   tasks.slice(0, showingTasksCount).forEach((task) => renderTask(taskListElement, task));
//
//
//   // рендерим кнопки "показать больше"
//   const loadMoreButtonComponent = new LoadMoreButtonComponent();
//   render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
//
//
//   // отслеживаем кнопку и рендерим ещё больше задач
//   loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
//     const prevTasksCount = showingTasksCount;
//     showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
//
//     tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => renderTask(taskListElement, task));
//
//     if (showingTasksCount >= tasks.length) {
//       loadMoreButtonComponent.getElement().remove();
//       loadMoreButtonComponent.removeElement();
//     }
//   });
// };
//
//
// // рендерим меню сайта
// const siteMainElement = document.querySelector(`.main`);
// const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
// render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
//
//
// // рендерим фильтры
// const filters = generateFilters();
// render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
//
//
// // рендерим блок основного контента
// const boardComponent = new BoardComponent();
// render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
//
//
// // рендерим блоки задач
// const tasks = generateTasks(TASK_COUNT);
// renderBoard(boardComponent, tasks);


// 3-лекция архив ------------------------------------------------------------
// // рендер функция
// const render = (container, template, place = `beforeend`) => {
//   container.insertAdjacentHTML(place, template);
// };
//
//
// // рендерим меню сайта
// const siteMainElement = document.querySelector(`.main`);
// const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
// render(siteHeaderElement, createSiteMenuTemplate());
//
//
// // рендерим фильтры
// const filters = generateFilters();
// render(siteMainElement, createFilterTemplate(filters));
//
//
// // рендерим блок основного контента
// render(siteMainElement, createBoardTemplate());
//
//
// // рендерим перый блок задач редактор
// const tasks = generateTasks(TASK_COUNT);
// const taskListElement = siteMainElement.querySelector(`.board__tasks`);
// render(taskListElement, createTaskEditTemplate(tasks[0]));
//
//
// // рендерим блоки задач
// let showingTasksCount = SHOWING_TASK_COUNT_ON_START;
// tasks.slice(1, showingTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));
//
//
// // рендерим кнопки "показать больше"
// const boardElement = siteMainElement.querySelector(`.board`);
// render(boardElement, createLoadMoreButtonTemplate());
//
//
// // отслеживаем кнопку и рендерим ещё больше задач
// const loadMoreButton = boardElement.querySelector(`.load-more`);
// loadMoreButton.addEventListener(`click`, () => {
//   const prevTasksCount = showingTasksCount;
//   showingTasksCount = showingTasksCount + SHOWING_TASK_COUNT_BY_BUTTON;
//
//   tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));
//
//   if (showingTasksCount >= tasks.length) {
//     loadMoreButton.remove();
//   }
// });
