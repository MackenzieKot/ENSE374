$(document).ready( () => { 

    $("#addtask").click( () => 
    { 
      //add task
      let newTask = $("#addtasktext").val();
      $("#addTaskDiv").before('<div class="input-group mb-3"> <input type="text" class="form-control" value="' + newTask +  '" readonly> <button class="btn btn-outline-secondary" type="button" id="claim">Claim</button></div>')
      $("#addtasktext").val("")
    });

    $("#Cleartasks").click( () => 
    {
      //remove completed tasks
      console.log($("input:checked").length)
      checkedArray = $("input:checked");
      taskDivArray = checkedArray.parent().parent();
      $(taskDivArray).remove();
    });
    
    $('#tasklist').on('click', 'button', function(){
      
      if($(this).attr("id") == "claim")
      {
        //replace the div with the new div that has a checkbx and abandon button
        let taskDiv = $(this).parent();
        let taskName = taskDiv.children()[0].value;
        $(taskDiv).before('<div class="input-group mb-3"> <div class="input-group-text"> <input class="form-check-input mt-0" type="checkbox"></div><input type="text" class="form-control" aria-label="task" value="'+ taskName +'" readonly><button class="btn btn-outline-secondary" type="button" id="abandon">Abandon</button></div>')
        $(taskDiv).remove();
      }
      else if($(this).attr("id") == "abandon")
      {
        //change from abandon back to claim
        let taskDiv = $(this).parent();
        let taskName = taskDiv.children()[1].value;
        $(taskDiv).before('<div class="input-group mb-3"> <input type="text" class="form-control" value="' + taskName +  '" readonly> <button class="btn btn-outline-secondary" type="button" id="claim">Claim</button></div>')
        $(taskDiv).remove();
      }
    });

    $('#tasklist').on('click', 'input', function(){

        if($(this).attr("type") == "checkbox")
        {
          let cbox = $(this);

          if(cbox.is(":checked"))
          {
            //change from abandon button to completed
            let taskDiv = cbox.parent().parent();
            let taskName = taskDiv.children()[1].value;
            $(taskDiv).before('<div class="input-group mb-3; comptask; nobutton"><div class="input-group-text"><input class="form-check-input mt-0" type="checkbox" checked> </div> <input type="text" class="form-control" aria-label="task" value="'+ taskName +'" readonly></div>')
            $(taskDiv).remove();
          }
          else
          {
            //change from completed to one with abandon button
            let taskDiv = cbox.parent().parent();
            let taskName = taskDiv.children()[1].value;
            $(taskDiv).before('<div class="input-group mb-3"> <div class="input-group-text"> <input class="form-check-input mt-0" type="checkbox"></div><input type="text" class="form-control" aria-label="task" value="'+ taskName +'" readonly><button class="btn btn-outline-secondary" type="button" id="abandon">Abandon</button></div>')
            $(taskDiv).remove();
          }
        }
    });
});


//FORMAT
//<section>
  //////////SOMEONE ELSE INCOMPLETE
  //<div class="input-group mb-3">
    //<input type="text" class="form-control" value="someone's incomplete task" readonly>
  //</div>

  ///////////SOMEONE ELSE COMPLETE
  //<div class="input-group mb-3; comptask">
    //  <input type="text" class="form-control" value="someone's completed task" readonly>
  //</div>

  ///////////UNCLAIMED TASK
  //<div class="input-group mb-3">
    // <input type="text" class="form-control" value="unclaimed task" readonly>
    // <button class="btn btn-outline-secondary" type="button" id="addtask">Claim</button>
  //</div>

  ///////YOUR INCOMPLETE TASK
  //<div class="input-group mb-3">
    //  <div class="input-group-text">
      //   <input class="form-check-input mt-0" type="checkbox">
    // </div>
    // <input type="text" class="form-control" aria-label="task" value="your incomplete task" readonly>
    // <button class="btn btn-outline-secondary" type="button" id="addtask">Abandon</button>
  //</div>

  ///////////YOUR COMPLETE TASK
  //<div class="input-group mb-3; comptask">
    //   <div class="input-group-text">
      //    <input class="form-check-input mt-0" type="checkbox">
    //  </div>
    //  <input type="text" class="form-control" aria-label="task" value="your complete task" readonly>
  //</div>

  ////////NEW TASK
  //<div class="input-group mb-3">
    //   <input type="text" class="form-control" placeholder="Enter a new task" >
    //   <button class="btn btn-outline-secondary" type="button" id="addtask">Add</button>
  //</input></div>

  ////////////CLEAR BUTTON
  //button class="btn btn-outline-secondary" type="button" id="Cleartasks">Clear completed tasks</button>
//</div></section>



