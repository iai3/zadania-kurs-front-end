var task = (function() {

                    // (function() {
                    //     console.log('%cHello. To bring up your list of tasks, type: ' + '%ctask.list()', 'background: #ddd; color: black', 'background: #555; color: white');
                    //     console.log('%cTo add new task, type: ' + '%ctask.add("new task")', 'background: #ddd; color: black', 'background: #555; color: white');
                    //     console.log('%cTo delete a task, type: ' + '%ctask.delete(task number)', 'background: #ddd; color: black', 'background: #555; color: white');
                    //     console.log('%cTo change status of task to "done" or "not done", type: ' + '%ctask.status(task number)', 'background: #ddd; color: black', 'background: #555; color: white');
                    // }())

                
                    var tasksTable = document.getElementById("tasks");

                    var formButton = document.getElementById("task-form-button");
                    formButton.addEventListener("click", addTask);
                    var formInput = document.getElementById("task-form-input");
                    formInput.addEventListener("keyup", buttonStatus);
                    var deleteButton = document.getElementById("task-form-delete");
                    deleteButton.addEventListener("click", checkedDelete);
                    var statusButton = document.getElementById("task-form-status");
                    statusButton.addEventListener("click", checkedStatus);
                    var checkbox = document.getElementsByClassName("checkbox");


                    function storage() {
                        if(!localStorage.getItem('taskList')) {
                            var list = [];
                            localStorage.setItem('taskList', JSON.stringify(list));
                            return list;
                          } else {
                            var list = JSON.parse(localStorage.getItem('taskList'));
                            return list;
                          }
                    }

                    function storageIdNumbers() {
                        if(!localStorage.getItem('idNumbers')) {
                            var idNumbers = 0;
                            localStorage.setItem('idNumbers', JSON.stringify(idNumbers));
                            return idNumbers;
                          } else {
                            var idNumbers = JSON.parse(localStorage.getItem('idNumbers'));
                            return idNumbers;
                          }

                    }

                    function saveList() {
                        localStorage.setItem('taskList', JSON.stringify(list));
                        localStorage.setItem('idNumbers', JSON.stringify(idNumbers));
                    }

                    var list = storage();
                    var idNumbers = storageIdNumbers();

                    showTasks();
                    

                    // BUTTON STATUS, ACTIVE OR DISABLED IF INPUT IS EMPTY
                    function buttonStatus() {
                        if(formInput.value == "") {
                            formButton.classList.remove("active");
                            formButton.classList.add("disabled");
                        } else {
                            formButton.classList.remove("disabled");
                            formButton.classList.add("active");
                        }
                    }

                    function isCheckbox(i){
                        checkbox[i].addEventListener( 'change', function() {
                            if(this.checked) {
                                deleteButton.classList.remove("disabled");
                                deleteButton.classList.add("active");
                                statusButton.classList.remove("disabled");
                                statusButton.classList.add("active");
                            } else {
                                deleteButton.classList.remove("active");
                                deleteButton.classList.add("disabled");
                                statusButton.classList.remove("active");
                                statusButton.classList.add("disabled");
                            }
                        });
                    }

                    // SHOW TASKS - VISUAL ONLY
                    function showTasks() {
                        tasksTable.innerHTML = "";
                        var list = storage();
                        var idNumbers = storageIdNumbers();
                        
                        for (var i = 0; i < list.length; i++) {
                        
                            var row = tasksTable.insertRow(0);

                            if (list[i][2] == true) {
                                status = "DONE";
            
                            } else {
                                status = "not done";
                            }

                            var cell1 = row.insertCell(0);
                            cell1.innerHTML = '<input type="checkbox" class="checkbox" id="task-id-' + list[i][0] +'">' // +  list[i][0];
                            var cell2 = row.insertCell(1);
                            cell2.innerHTML = list[i][1];
                            var cell3 = row.insertCell(2);
                            cell3.innerHTML = status;

                            //localStorage.setItem('taskList', JSON.stringify(list));

                            
                        }

                        for (var i = 0; i < list.length; i++) {
                            isCheckbox(i);
                        }

                    }

                    

                    // ADD TASK
                    function addTask () {
                        event.preventDefault();
                        //var list = storage();
                        idNumbers++;

                        if(formInput.value == false) {
                            console.log("New task cannot be empty!");

                        } else {
                        var newTask = [idNumbers, formInput.value, false];
                        list.push(newTask);

                        saveList();
                        
                        console.log("You added task: " + newTask[1]);
                        
                        formInput.value = "";
                        formButton.classList.remove("active");
                        formButton.classList.add("disabled");

                        showTasks();
                        }
                    }
                    
                    // DELETE TASK VISUAL (BUTTON)
                    function deleteTask(id) {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i][0] == id) {
                                var removedTask = list.splice(i, 1);
                                saveList();
                                console.log("You removed task: " + removedTask);

                                deleteButton.classList.remove("active");
                                deleteButton.classList.add("disabled");
                                statusButton.classList.remove("active");
                                statusButton.classList.add("disabled");
                            }
                        }
                    }


                    // CHECK IF TASK IS CHECKED
                    function checkedDelete() {
                        if (confirm('Are you sure you want to delete those tasks?')) {
                            for (var i = 0; i < list.length; i++) {
                                var task = document.getElementById("task-id-" + list[i][0]);
                                var isChecked = task.checked;

                                if (isChecked) {
                                    deleteTask(list[i][0]);
                                    i--;
                                    
                                }
                            }

                            showTasks();
                        } else {}

                    }

                    // CHANGE STATUS, CONSOLE ONLY
                    function changeStatus(id) {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i][0] == id) {
                                list[i][2] = !list[i][2];
                                saveList();

                                deleteButton.classList.remove("active");
                                deleteButton.classList.add("disabled");
                                statusButton.classList.remove("active");
                                statusButton.classList.add("disabled");
                            }
                        }
                    }

                    // FIND CHECKED AND CHANGE THEIR STATUS
                    function checkedStatus() {

                        for (var i = 0; i < list.length; i++) {
                            var task = document.getElementById("task-id-" + list[i][0]);
                            var isChecked = task.checked;

                            if (isChecked) {
                                changeStatus(list[i][0]);
                            }
                        }

                        showTasks();
                    }

                    
                return {
                };
                })();