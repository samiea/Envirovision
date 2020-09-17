let hideCompletedTask = false;
var currentItemGlobal = 0;
let overdueOnlyFlag = false;
let numOfCompleted = 0;
const TRUNC_LIMIT = 30;

var tasks = [];

function truncate(input, number) {
   if (input.length > number)
      return input.substring(0,number) + '...';
   else
      return input;
};

function getFormattedDate(date) {
  if(date == null){
    return "";
  }
  var year = date.getFullYear();

  var month = (1+date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '/' + day + '/' + year;
}

// date we get from server is string. This is to change the string to Date object
let reviveDate = function(strDate){

  if(strDate == null)
    return null;

  let dateObj = new Date(strDate);
  if (isNaN(dateObj.getTime()))
  {
    dateObj = null;
  }

  return dateObj;
}

let renderHTML = function(index){

  let renderedHTML = "";
  let task = tasks[index];
  let title = truncate(task.title,TRUNC_LIMIT);
  let checked = "";
  let tr_class = "";
  if(task.completed){
    title = "<del>"+title+"</del>";
    checked = "checked";
    tr_class += "success";
  }else{
    if(task.dueDate < new Date() && task.dueDate != null ){
      tr_class += "danger";
    }
  }
  renderedHTML ='\
    <tr id="'+ task.id + '" class ="'+tr_class+'">\
      <td class = "text-center"><input type="checkbox" class="form-check-input" value ='+ task.id + ' '+  checked +'></td>\
      <td class = "text-center">'+ title + '</td>\
      <td class = "text-center"><span class ="text-right"><button class = "btn btn-xs btn-warning" data-toggle="collapse" data-target="#note-'+ task.id + '"><span class="glyphicon glyphicon-triangle-bottom"> </span> Note</button></span></td>\
      <td class = "text-center">'+ (task.dueDate? getFormattedDate(task.dueDate) : "") + '</td>\
      <td class = "text-center">'+ (task.completeDate? getFormattedDate(task.completeDate) : "")+ '</td>\
      <td class = "text-center">\
        <button type="button" class="btn btn-warning btn-xs updatetask" alt="Update the task" value= '+task.id+'><span class="glyphicon glyphicon-pencil"></span></button>\
        <button type="button" class="btn btn-danger btn-xs deletetask" alt ="Delete the task" value = '+task.id+'><span class="glyphicon glyphicon-trash"></span></button>\
        <a target=_blank href="mailto:?body='+task.note+'&subject='+task.title+'"><button type="button" class="btn btn-danger btn-xs emailtask" alt="Send an email" value = '+task.id+'><span class="glyphicon glyphicon-envelope"></span></button></a>\
      </td>\
    </tr>\
    <tr id = "note-' + task.id + '" class="collapse">\
      <td></td><td colspan = 5">\
        <div class = "well">\
          <h3>\
            '+ task.title +
          '</h3>\
          <div>'
            +task.note.replace(/\r\n|\r|\n/g,"<br/>")+
          '</div>\
        </div>\
      </td>\
    </tr>\
  ';
  // TODO redner HTML element for one item.
  return renderedHTML;
}


let renderTasks =function(){

  //get the tasks form the network
  console.log("rendering");

  // TODO redner all HTML elements based on the current tasks object.
  // Add event handlers for checkboxes, delete button, and udpate button.
  // using for loop is recommended over using forEach function so that you can use array index.
  // note that renderHTML takes index as its only parameter.

  $("tbody").empty();
  numOfCompleted = 0;
  let Now = new Date();

  for ( let i=0; i<tasks.length; i++){

    if (tasks[i].deleted)
      continue;

    if (hideCompletedTask && tasks[i].completed)
      continue;

    if(overdueOnlyFlag && (tasks[i].dueDate == null || tasks[i].dueDate > Now || tasks[i].completed ))
      continue;

    if (!hideCompletedTask && tasks[i].completed){
      numOfCompleted++;
    }

    $('#tasks>tbody').append(renderHTML(i));
  }

  // add interative behaviors
  $('.form-check-input').change(function() {
    tasks[this.value].completed = this.checked;
    if(tasks[this.value].completed){
      tasks[this.value].completeDate =  new Date();

      $.post("updatetask", {
        _id : tasks[this.value]._id,

        data:{//_id : tasks[index]._id,

        title: tasks[this.value].title,
        dueDate: tasks[this.value].dueDate,
        note:tasks[this.value].note,
        completed : tasks[this.value].completed,
        completeDate : reviveDate(tasks[this.value].completeDate)

      }})
      .done(function(data, status, obj){
        console.log(data);

        $("#serverresponse").text(data.serverchoice);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        console.error(jqXHR.responseText);
      }); //endpoint

      numOfCompleted++;
    }else{
      tasks[this.value].completeDate = null;
      $.post("updatetask", {
        _id : tasks[this.value]._id,

        data:{//_id : tasks[index]._id,

        title: tasks[this.value].title,
        dueDate: tasks[this.value].dueDate,
        note:tasks[this.value].note,
        completed : tasks[this.value].completed,
        completeDate : reviveDate(tasks[this.value].completeDate)

      }})
      .done(function(data, status, obj){
        console.log(data);

        $("#serverresponse").text(data.serverchoice);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        console.error(jqXHR.responseText);
      }); //endpoint
      numOfCompleted--;
    }
    renderTasks();
  });

  if (numOfCompleted > 0){
    $("#deleteCompletedTasks").prop('disabled', false);
  }else if (numOfCompleted == 0){
    $("#deleteCompletedTasks").prop('disabled', true);
  }else{
    debugger; // this should not happen.
  }

  $('.updatetask').click(function(){
    //tasks[this.value].deleted =  true;
    console.log("updatetask is clicked");
    //console.log(tasks[this.value]._id)
    currentItemGlobal=tasks[this.value].id;
    $("#myUpdateTaskModal").modal();

  });

  $('.deletetask').click(function(){
    if(!confirm("Are you sure?"))
      return;

    //tasks[this.value].deleted =  true;
    console.log("delete is clicked");
    //console.log(tasks[this.value]._id)
    $.post("deletetask", {
      _id : tasks[this.value]._id, data:{
      id: tasks[this.value].id,
      title: tasks[this.value].title,
      dueDate: tasks[this.value].dueDate,
      completed : tasks[this.value].completed,
      completeDate : tasks[this.value].completeDate,
      createdDate: tasks[this.value].createdDate,
      deleted:tasks[this.value].deleted,
      note:tasks[this.value].note
    }})
    .done(function(data, status, obj){
      console.log(data);
      fetchData();
      $("#serverresponse").text(data.serverchoice);
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.error(jqXHR.responseText);
    }); //endpoint

  });


}

let fetchData = function(){
  //get the tasks form the network
  tasks=[];
  console.log("fetching");
  $.get("fetchtasks", {})
  .done(function(data, status, obj){
    console.log(data);
    for(i=0;i<data.data.length;i++){

      var taskItem = {_id: data.data[i]._id,
        id: i,
        title: data.data[i].title,
        dueDate: reviveDate(data.data[i].dueDate),
        completed : data.data[i].completed,
        completeDate : reviveDate(data.data[i].completeDate),
        createdDate: reviveDate(data.data[i].createdDate),
        deleted:data.data[i].deleted,
        note:data.data[i].note
      };

      if (tasks.length>i)
      {
        tasks[i]=taskItem;
      }
      else{
        tasks.push(taskItem);
      }
      renderTasks();
    }

    $("#serverresponse").text(data.serverchoice);
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.error(jqXHR.responseText);
  }); //endpoint

  // TODO replace tasks (line 1) objects with the ones from the server response.
  // make sure that you use reviveDate to convert string to Date object.
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
$(document).ready(function(){

  fetchData();

  $("#deleteCompletedTasks").click(function(){
    if(!confirm("Do you want to delete "+ numOfCompleted + " task" + (numOfCompleted>1?"s?":"?")))
      return;
    $('.form-check-input').each(function(){
      if(this.checked)
      $.post("deletetask", {
        _id : tasks[this.value]._id, data:{
        id: tasks[this.value].id,
        title: tasks[this.value].title,
        dueDate: tasks[this.value].dueDate,
        completed : tasks[this.value].completed,
        completeDate : tasks[this.value].completeDate,
        createdDate: tasks[this.value].createdDate,
        deleted:tasks[this.value].deleted,
        note:tasks[this.value].note
      }})
      .done(function(data, status, obj){
        console.log(data);
        
        $("#serverresponse").text(data.serverchoice);
      })
      .fail(function(jqXHR, textStatus, errorThrown){
        console.error(jqXHR.responseText);
      }); //endpoint
    })
    fetchData();
  });

  $('#overdue').click(function(){
    $(this).toggleClass("active");
    overdueOnlyFlag = !overdueOnlyFlag
    renderTasks();
  });

  $('#hidecompleted').click(function(){
    $(this).toggleClass("active");
    hideCompletedTask = !hideCompletedTask;
    renderTasks();
  });

  $("#updateTask").click(function(event){
    //tasks[this.value].deleted =  true;
    console.log("updateTask is clicked");

    // check if title is null
    event.preventDefault();
    let index = currentItemGlobal;
    console.log(index);
    let title = $("#update-task-title").val().trim();
    if(title.length == 0){
      alert("Task title is required");
      return;
    }
    let dueDate = $("#update-due-date").val().trim();
    if (dueDate.length==0){
      dueDate = null;
    }else{
      if(isNaN(Date.parse(dueDate))){
        alert("Check your date format.")
        return;
      }
      dueDate = new Date(dueDate);
    }
    let note = $("#update-task-note").val();



    $.post("updatetask", {
      _id : tasks[index]._id,

      data:{//_id : tasks[index]._id,

      title: title,
      dueDate: dueDate,
      note:note,
      completed : tasks[index].completed,
      completeDate : reviveDate(tasks[index].completeDate)

    }})
    .done(function(data, status, obj){
      console.log(data);

      $("#serverresponse").text(data.serverchoice);
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.error(jqXHR.responseText);
    }); //endpoint
    $("#myUpdateTaskModal").modal("hide");
    $("#update-task-title").val("");
    $("#update-due-date").val("");
    $("#update-task-note").val("");
    fetchData();
  });

  $("#submitNewTask" ).click(function( event ) {
    // check if title is null
    event.preventDefault();

    let title = $("#task-title").val().trim();
    if(title.length == 0){
      alert("Task title is required");
      return;
    }
    let dueDate = $("#due-date").val().trim();
    if (dueDate.length==0){
      dueDate = null;
    }else{
      if(isNaN(Date.parse(dueDate))){
        alert("Check your date format.")
        return;
      }
      dueDate = new Date(dueDate);
    }
    let note = $("#task-note").val();

    console.log("newtask is clicked");
    $.post("newtask", {
      id: tasks.length,
      title: title,
      dueDate: dueDate,
      completed : false,
      completeDate : null,
      createdDate: new Date(),
      deleted:false,
      note:note
    })
    .done(function(data, status, obj){
      console.log(data);

      $("#serverresponse").text(data.serverchoice);
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.error(jqXHR.responseText);
    }); //endpoint



    $("#myNewTaskModal").modal("hide");
    $("#task-title").val("");
    $("#due-date").val("");
    $("#task-note").val("");
    fetchData();
  });

  $(".addtask").click(function(){
    console.log("add task button pressed");
    $("#myNewTaskModal").modal();

  });

  $("#refresh").click(function(){
    fetchData();
  });

});
