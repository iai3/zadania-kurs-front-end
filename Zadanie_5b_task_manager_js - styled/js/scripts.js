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

                    var sortingElement;
                    var sortingOrder;

                    // error messages
                    var taskIsEmpty = document.getElementById("taskIsEmpty");
                    var noFinishedTasks = document.getElementById("noFinishedTasks");
                    var noCheckedTasks = document.getElementById("noCheckedTasks");

                    // help
                    var helpIcon = document.getElementById("helpIcon");
                    var helpText = document.getElementsByClassName("help");


                    helpIcon.addEventListener("click", showHelp);

                    function showHelp() {
                        console.log(helpText);
                        for (var element of helpText) {
                            console.log(element);
                            if (element.classList.contains("d-none")) {
                                element.classList.remove("d-none");
                                element.classList.add("d-block");
                            } else {
                                element.classList.add("d-none");
                                element.classList.remove("d-block");
                            }
                        }
                        
                        
                    }



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
                          } else {
                            var idNumbers = JSON.parse(localStorage.getItem('idNumbers'));
                            }
                            return idNumbers;

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

                    // check if there are finished tasks, and change "remove all finished" button status
                    function checkFinished() {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i][4] == true) {
                                deleteAllButton.classList.add("active");
                                deleteAllButton.classList.remove("disabled");
                                noFinishedTasks.classList.add("d-none");
                                noFinishedTasks.classList.remove("d-inline");
                            }
                        }
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
                                row.classList.add("finished");
                            } else {
                                status = "not done";
                                row.classList.remove("finished");
                            }

                            var cell1 = row.insertCell(0);
                            cell1.innerHTML = '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input checkbox" id="task-id-' + list[i][0] +'"><label class="custom-control-label" for="task-id-' + list[i][0] + '"></label></div>';
                            var cell2 = row.insertCell(1);
                            cell2.innerHTML = list[i][3];
                            var cell3 = row.insertCell(2);
                            cell3.innerHTML = list[i][2] + "<br>" + list[i][1];

                            

                            
                        }

                        deleteAllButton.classList.remove("active");
                        deleteAllButton.classList.add("disabled");

                        clearErrors();
                        checkFinished();


                        if(sortingElement && sortingOrder) {
                            sortBy(sortingElement, false, sortingOrder);
                        }

                        

                        for (var i = 0; i < list.length; i++) {
                            isCheckbox(i);
                        }

                        var trs = wholeTable.querySelectorAll("tbody tr");
                        
                    }

                    function clearErrors(){
                        noFinishedTasks.classList.add("d-none");
                        noFinishedTasks.classList.remove("d-inline");
                        taskIsEmpty.classList.add("d-none");
                        taskIsEmpty.classList.remove("d-inline");
                        noCheckedTasks.classList.add("d-none");
                        noCheckedTasks.classList.remove("d-inline");
                    }

                    

                    // ADD TASK
                    function addTask (event) {
                        event.preventDefault();
                        //var list = storage();
                        
                        if(formInput.value == false) {
                            console.log("New task cannot be empty!");
                            clearErrors();
                            taskIsEmpty.classList.remove("d-none");
                            taskIsEmpty.classList.add("d-inline");

                        } else {
                        
                        clearErrors();

                        var newTask = [idNumbers, getTimeAndDate()[0], getTimeAndDate()[1], formInput.value, false];
                        list.push(newTask);
                        idNumbers++;

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
                        if (deleteButton.classList.contains("active")) {
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
                            }
                        } else {
                            clearErrors();
                            noCheckedTasks.classList.remove("d-none");
                            noCheckedTasks.classList.add("d-inline");
                        }
                        



                    }

                    // find all with status 'done'
                    function checkedDeleteAll() {
                        if (deleteAllButton.classList.contains("active")) {
                            if (confirm('Are you sure you want to delete all finished tasks?')) {
                                for (var i = 0; i < list.length; i++) {
                                    var status = list[i][4];
                                    if(list[i][4] === true) {
                                        deleteTask(list[i][0]);
                                        i--;
                                    }
                                }
    
                                showTasks();
                            }
                        } else {
                            clearErrors();
                            noFinishedTasks.classList.remove("d-none");
                            noFinishedTasks.classList.add("d-inline");
                        }
                        

                    }

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

                        if (deleteButton.classList.contains("active")) {
                            for (var i = 0; i < list.length; i++) {
                                var task = document.getElementById("task-id-" + list[i][0]);
                                var isChecked = task.checked;
    
                                if (isChecked) {
                                    changeStatus(list[i][0]);
                                }
                            }
    
                            showTasks();
                        } else {
                            clearErrors();
                            noCheckedTasks.classList.remove("d-none");
                            noCheckedTasks.classList.add("d-inline");
                        }

                    }

                    // TIMESTAMP


                    function getTimeAndDate() {
                        var time = new Date().toLocaleTimeString();
                        var date = new Date().toLocaleDateString();

                        time = time.slice(0,5);
                        date = date.slice(0,6) + date.slice(8,10);

                        var timeAndDate = [time, date];

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

                    function sortBy(e, changeOrder = true, ord) {
                        var trs = wholeTable.querySelectorAll("tbody tr:not(.finished)");
                        var trsFinished = wholeTable.querySelectorAll("tbody tr.finished");

                        var target = e.target,
                            thsArr = makeArray(ths),
                            trsArr = makeArray(trs),
                            trsFinishedArr = makeArray(trsFinished),

                            index = thsArr.indexOf(target),
                            documentFragment = document.createDocumentFragment(),
                            documentFragmentFinished = document.createDocumentFragment();

                            if(changeOrder) {
                                var order = (target.className === '' || target.className === 'desc') ? 'asc' : 'desc';
                            } else {
                                var order = ord;
                            }
                           


                        clearClassName(ths);

                        function sorting(a, b) {
                            var tdA = a.children[index].textContent,
                                tdB = b.children[index].textContent;

                                tdA = tdA.toLowerCase();
                                tdB = tdB.toLowerCase();


                            if(tdA < tdB) {
                                return order === "asc" ? -1 : 1;
                            } else if(tdA > tdB) {
                                return order === "asc" ? 1 : -1;
                            } else {
                                return 0;
                            }

                            
                            

                        }

                        trsArr.sort(sorting);
                        trsFinishedArr.sort(sorting);

                        trsArr.forEach(function(tr) {
                            documentFragment.appendChild(tr);
                        });

                        trsFinishedArr.forEach(function(tr) {
                            documentFragment.appendChild(tr);
                        });

                        sortingElement = e;
                        sortingOrder = order;

                        target.className = order;
                        
                        wholeTable.querySelector('tbody').appendChild(documentFragment);
                        wholeTable.querySelector('tbody').appendChild(documentFragmentFinished);

                    }




                    for (var i = 0; i < ths.length; i++) {
                        ths[i].addEventListener('click', sortBy);
                    }

                    function arraySorting(a, b) {
                        var tdA = a.children[index].textContent,
                            tdB = b.children[index].textContent;

                            tdA = tdA.toLowerCase();
                            tdB = tdB.toLowerCase();

                        
                        if(tdA < tdB) {
                            return order === "asc" ? -1 : 1;
                        } else if(tdA > tdB) {
                            return order === "asc" ? 1 : -1;
                        } else {
                            return 0;
                        }

                    }
                    
                    
                })();