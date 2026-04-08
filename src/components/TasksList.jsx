// Example implementation logic

import { Trash2 } from "lucide-react";
import { saveTasks } from "../utils/calendar";

const TaskList = ({ tasks, setTasks, setSelectedTask }) => {
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks); // update UI
    saveTasks(updatedTasks); // persist
  };

  return (
    <div className="space-y-4 overflow-y-auto max-h-[400px] bg-g">
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task, index) => (
          <div
            key={index}
            onClick={()=> setSelectedTask(task)}
            className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-300 flex items-center justify-between transition-colors "
          >
            <h4 className={task.completed ? "line-through opacity-50" : ""}>
              {task.text.length > 11
                ? task.text.slice(0, 11) + "..."
                : task.text}
            </h4>
            <Trash2 className="w-4 h-4 text-gray-600 hover:!text-red-500" onClick={()=>{
                handleDelete(task.id)
            }} />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
