// window.addEventListener ("load", expandGeneration(), false);
// document.onreadystatechange = function () {
//     if (document.readyState == "complete") {
//         expandGeneration()
//   }
// }

function expandGeneration(){
    var btns = document.getElementsByTagName('button')
    var showCount = 0
    for(var i = 0;i<btns.length;i++){
        if(btns[i].getAttribute('aria-label')){
            if(btns[i].getAttribute('aria-label').includes('Show') && !btns[i].getAttribute('aria-label').includes('spouse')){
                btns[i].click()
                showCount++
            }
        }
    }
    if(showCount==0){
        alert('All Generations Expanded!')
    }
}
function nGenerations(numberOfGenerations){
    for(var i=0;i<numberOfGenerations;i++){
        expandGeneration()
        yield()
    }

}

function findPotentialAncestor(){
    if(document.getElementsByClassName("potential").length > 0){
        var ancestorRectangle = document.getElementsByClassName("potential")[0].getBoundingClientRect();
        var ancestorVerticalCenter = (ancestorRectangle.bottom - ancestorRectangle.top)/2
        var ancestorHorizontalCenter = (ancestorRectangle.right - ancestorRectangle.left)/2
        var treeWrapper = document.getElementsByClassName("treeWrapper")[0]
        var containerWindow = document.getElementsByClassName("treeViewZoomPanContainer")[0].getBoundingClientRect()
        var screenVerticalCenter = containerWindow.top + ((containerWindow.bottom - containerWindow.top)/2)
        var screenHorizontalCenter = containerWindow.left + ((containerWindow.right - containerWindow.left)/2)
        
        var desiredTop = screenVerticalCenter - ancestorVerticalCenter
        var desiredLeft = screenHorizontalCenter - ancestorHorizontalCenter

        var verticalMovementRequired = desiredTop - ancestorRectangle.top
        var horizontalMovementRequired = desiredLeft - ancestorRectangle.left
        treeWrapper.style.top = +treeWrapper.style.top.match(/\d*\.*\d*/)[0] + verticalMovementRequired + 'px'
        treeWrapper.style.left = +treeWrapper.style.left.match(/\d*\.*\d*/)[0] + horizontalMovementRequired + 'px'
    }
    
    // console.log(rect.top, rect.right, rect.bottom, rect.left);
}

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(request, sender, sendResponse){
    if(document.location.href.match(/https:.*ancestry.com.family-tree.tree.*cfpid=\d*.*/)[0]==document.location.href){
        expandGeneration()
        findPotentialAncestor()
    }
}


// save for later matching
// "https://*.ancestry.com/family-tree/tree/*cfpid=*"
// /^https:-store.mywebsite.com.(folder-\d+)/