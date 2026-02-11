import ChangeTaskCategory from "./change-task-category";
import EditTaskDueDate from "./edit-task-due-date";
import ReassignTasks from "./reassign-tasks";
import UpdateRules from "./update-rules";

export const dataArray = ({
  isReassignOpen,
  setIsReassignOpen,
  isChangeTaskOpen,
  setIsChangeTaskOpen,
  isUpdateRulesOpen,
  setIsUpdateRulesOpen,
  isEditTaskDateOpen,
  setIsEditTaskDateOpen,
}) => [
  {
    id: 1,
    state: isReassignOpen,
    setState: setIsReassignOpen,
    modalBoxHeading: "Reassign Tasks",
    children: <ReassignTasks setIsReassignOpen={setIsReassignOpen} />,
  },
  {
    id: 2,
    state: isChangeTaskOpen,
    setState: setIsChangeTaskOpen,
    modalBoxHeading: "Update Tasks",
    children: <ChangeTaskCategory setIsChangeTaskOpen={setIsChangeTaskOpen} />,
  },
  {
    id: 3,
    state: isUpdateRulesOpen,
    setState: setIsUpdateRulesOpen,
    modalBoxHeading: "Edit Rules",
    children: <UpdateRules setIsUpdateRulesOpen={setIsUpdateRulesOpen} />,
  },
  {
    id: 4,
    state: isEditTaskDateOpen,
    setState: setIsEditTaskDateOpen,
    modalBoxHeading: "Edit Task Due Date",
    children: <EditTaskDueDate setIsEditTaskDateOpen={setIsEditTaskDateOpen} />,
  },
];
