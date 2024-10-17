import { useState, useRef } from 'react';
import SearchTask from './SearchTask.jsx';
import { MdDelete } from "react-icons/md";
import useWindowSize from './hook/useWindowSize.jsx';


// [
//     { text: 'Wake up early morning', checked: false },
//     { text: 'Do some exercise', checked: false },
//     { text: 'Dont forget to eat breakfast', checked: false }]

function ToDoList(){
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('todo_list')) || []);
    const [newTask, setNewTask] = useState('');
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);
    const {width} = useWindowSize({});

    function handleInputChange(event){
        setNewTask(event.target.value);
        
    }
    function handleSubmit(event){
        event.preventDefault();
        
    }
    function handleCheck(index){
        const finishedTask = tasks.map((task,i) => i === index ?
            {...task, checked: !task.checked} : task
         );
         setTasks(finishedTask);
         localStorage.setItem('todo_list', JSON.stringify(finishedTask));

    }
    
    function addTask(){
        if(newTask.trim() !== ''){
            const addedTask = [...tasks, {text: newTask, checked: false}];
            setTasks(addedTask);
            setNewTask('');
            inputRef.current.focus();
        localStorage.setItem('todo_list', JSON.stringify(addedTask));
        }
    }
    function deleteTask(index){
        const updatedTask = tasks.filter((_, i) => i !== index);
        setTasks(updatedTask);
        localStorage.setItem('todo_list', JSON.stringify(updatedTask));
    }
    function moveTaskUp(index){
        if(index > 0){
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index - 1]] = 
            [updatedTask[index - 1], updatedTask[index]];
            setTasks(updatedTask);
        }
    }
    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTask = [...tasks];
            [updatedTask[index], updatedTask[index + 1]] =
            [updatedTask[index + 1], updatedTask[index]];
            setTasks(updatedTask);
        }
    }

    return(
        <div className='to-do-list'>
            <h1>To-Do-List</h1>
            <form id='form1' onSubmit={handleSubmit}>
                <input type="text" 
                placeholder='Enter a task'
                value={newTask}
                onChange={handleInputChange}
                ref={inputRef}
                />
                <button className='add-button'
                    onClick={addTask}>
                    Add</button>
            </form>
            <SearchTask 
            search={search}
            setSearch={setSearch}/>
            <ol>
                {tasks.length ? (
                tasks.filter(task => 
                    task.text.toLowerCase().
                    includes(search.toLowerCase()))
                    .map((task, index) => 
                    <li key={index}>
                        <input type='checkbox' checked={task.checked}
                        onChange={() => handleCheck(index)}/>
                        <span className='text' 
                        style={(task.checked) ? {textDecoration:'line-through', color:'#6c757d'} : null}
                        onDoubleClick={() => handleCheck(index)}>{task.text}</span>
                        <button
                        className='delete-button'
                        onClick={() => deleteTask(index)}>
                            {(width < 450) ? <MdDelete /> : 'Delete' }</button>
                        <button
                        className='move-button'
                        onClick={() => moveTaskUp(index)}>
                            ☝️
                        </button>
                        <button
                        className='move-button'
                        onClick={() => moveTaskDown(index)}>
                            👇
                        </button>
                    </li>) ) : <p id='emptyTask'> Your task list is empty🪹</p>}
            </ol>
        </div>
    )
}

export default ToDoList

      