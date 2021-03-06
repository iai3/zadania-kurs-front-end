(function() {

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
                    var deleteAllButton = document.getElementById("task-form-delete-all");
                    deleteAllButton.addEventListener("click", checkedDeleteAll);
                    var statusButton = document.getElementById("task-form-status");
                    statusButton.addEventListener("click", checkedStatus);
                    var checkbox = document.getElementsByClassName("checkbox");


                    


                    // elements for sorting
                     var wholeTable = document.getElementById("wholeTable");
                     var ths = wholeTable.querySelectorAll("thead th");


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

                            if (list[i][4] == true) {
                                status = "DONE";
            
                            } else {
                                status = "not done";
                            }

                            var cell1 = row.insertCell(0);
                            cell1.innerHTML = '<input type="checkbox" class="checkbox" id="task-id-' + list[i][0] +'">' // +  list[i][0];
                            var cell2 = row.insertCell(1);
                            cell2.innerHTML = list[i][2];
                            var cell3 = row.insertCell(2);
                            cell3.innerHTML = list[i][3];
                            var cell4 = row.insertCell(3);
                            cell4.innerHTML = status;

                            //localStorage.setItem('taskList', JSON.stringify(list));
                            

                            
                        }

                        for (var i = 0; i < list.length; i++) {
                            isCheckbox(i);
                        }

                        var trs = wholeTable.querySelectorAll("tbody tr");

                        // for (var i = 0; i < ths.length; i++) {
                        //     ths[i].onclick = sortBy;
                        //     console.log(ths[i]);
                        // }

                    }

                    

                    // ADD TASK
                    function addTask () {
                        event.preventDefault();
                        //var list = storage();
                        idNumbers++;

                        if(formInput.value == false) {
                            console.log("New task cannot be empty!");

                        } else {
                        var newTask = [idNumbers, getTimeAndDate()[0], getTimeAndDate()[1], formInput.value, false];
                        list.push(newTask);

                        saveList();
                        
                        console.log("You added task: " + newTask);
                        
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

                    // find all with status 'done'
                    function checkedDeleteAll() {
                        if (confirm('Are you sure you want to delete all finished tasks?')) {
                            for (var i = 0; i < list.length; i++) {
                                var status = list[i][4];
                                if(list[i][4] === true) {
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
                                list[i][4] = !list[i][4];
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

                    // TIMESTAMP

                    

                    function getTimeAndDate() {
                        var time = new Date().toLocaleTimeString();
                        var date = new Date().toLocaleDateString();

                        time = time.slice(0,5);

                        var timeAndDate = [time, date];


                        //var days = Math.floor(timeNow / (1000 * 60 * 60 * 24));
                        //var hours = Math.floor((timeNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        //var minutes = Math.floor((timeNow % (1000 * 60 * 60)) / (1000 * 60));
                        //var seconds = Math.floor((timeNow % (1000 * 60)) / 1000);

                        //var timestamp = hours + ':' + minutes;

                        return timeAndDate;
                    }

                    // SORTING TABLE

                    function makeArray(nodeList) {
                        var arr = [];

                        for (var i = 0; i < nodeList.length; i++) {
                            arr.push(nodeList[i]);
                        }

                        return arr;
                    }

                    function clearClassName(nodeList) {

                        for( var i = 0; i < nodeList.length; i++) {
                            nodeList[i].className = '';
                        }

                    }

                    function sortBy(e) {
                        var trs = wholeTable.querySelectorAll("tbody tr");

                        var target = e.target,
                            thsArr = makeArray(ths),
                            trsArr = makeArray(trs),
                            index = thsArr.indexOf(target),
                            documentFragment = document.createDocumentFragment(),
                            order = (target.className === '' || target.className === 'desc') ? 'asc' : 'desc';


                        clearClassName(ths);

                        trsArr.sort(function(a, b) {
                            var tdA = a.children[index].textContent,
                                tdB = b.children[index].textContent;

                            
                            if(tdA < tdB) {
                                return order === "asc" ? -1 : 1;
                            } else if(tdA > tdB) {
                                return order === "asc" ? 1 : -1;
                            } else {
                                return 0;
                            }

                        })

                        trsArr.forEach(function(tr) {
                            documentFragment.appendChild(tr);
                        });

                        target.className = order;
                        wholeTable.querySelector('tbody').appendChild(documentFragment);
                        
                    }




                    for (var i = 0; i < ths.length; i++) {
                        ths[i].addEventListener('click', sortBy);
                    }
                    
                    
                })();