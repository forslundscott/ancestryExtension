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

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(request, sender, sendResponse){
    if(document.location.href.match(/https:.*ancestry.com.family-tree.tree.*cfpid=\d*.*/)[0]==document.location.href){
        expandGeneration()
    }
}


// save for later matching
// "https://*.ancestry.com/family-tree/tree/*cfpid=*"
// /^https:-store.mywebsite.com.(folder-\d+)/