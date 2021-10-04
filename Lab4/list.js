
document.getElementById("additem").addEventListener("click", addItem, false )
function addItem(){

    let newDiv = document.createElement("div");
    let newText = document.createElement("input");

    let userInput = document.getElementById("inputfield").value;

    newText.setAttribute("id", userInput);
    newText.setAttribute("value", userInput);
    newText.setAttribute("readonly", "");
    newText.classList.add("form-control");
    newDiv.setAttribute("id", userInput)
    newDiv.appendChild(newText);

 
    document.getElementById("listspace").appendChild(newDiv);
    document.getElementById("inputfield").value = "";
}

document.getElementById("sortlist").addEventListener("click", sortList, false )
function sortList(){
   

    let space = document.getElementById("listspace");

    let childarray = space.children;

    let notsorted = true;
    while(notsorted)
    {
        notsorted = false; 
        let min = childarray[0].getAttribute("id");
   
        for (i = 0; i < childarray.length; i++){
    
            for (j = i+1; j < childarray.length; j++)
            {
                let a = childarray[i];
                let b = childarray[j]
                let aID = a.getAttribute("id");
                let bID = b.getAttribute("id");
                
                if(aID > bID)
                {
                    notsorted = true;
                    a.parentNode.insertBefore(b,a);
                }
            }
        }
    }      

}