document.body.onload = function() {
    document.getElementById('name').value = getParam('name');
    document.getElementById('dob').value = getParam('dob');
    document.getElementById('nationality').value = getParam('nationality');
    document.getElementById('height').value = getParam('height');
    document.getElementById('position').value = getParam('position');
    document.getElementById('number').value = getParam('number');
    document.getElementById('goals').value = getParam('goals');
    document.getElementById('injured').value = getParam('injured');
} 

function getParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}
