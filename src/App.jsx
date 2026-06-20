import { useState, useEffect } from "react"

function App() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {

    const saved =
      localStorage.getItem("todos")

    if (saved) {
      setTasks(JSON.parse(saved))
    }

  }, [])

  useEffect(() => {

    localStorage.setItem(
      "todos",
      JSON.stringify(tasks)
    )

  }, [tasks])

  function addTask() {

    if (!task) return

    if (editIndex !== null) {

      const updated = [...tasks]

      updated[editIndex] = task

      setTasks(updated)

      setEditIndex(null)

    } else {

      setTasks([...tasks, task])

    }

    setTask("")
  }

  function deleteTask(index) {

    setTasks(
      tasks.filter((_, i) => i !== index)
    )
  }

  function editTask(index) {

    setTask(tasks[index])

    setEditIndex(index)
  }

  return (
    <div>

      <h1>Todo App 📝</h1>

      <input
        value={task}
        onChange={(e) =>
          setTask(e.target.value)
        }
        placeholder="Enter task"
      />

      <button onClick={addTask}>
        {editIndex !== null
          ? "Update"
          : "Add"}
      </button>

      {
        tasks.map((item, index) => (

          <div key={index}>

            {item}

            <button
              onClick={() =>
                editTask(index)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteTask(index)
              }
            >
              Delete
            </button>

          </div>

        ))
      }

    </div>
  )
}

export default App