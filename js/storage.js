function saveData(itemKey, data) {
    localStorage.setItem('data_'+itemKey, data);
    return 1
}

function loadData(itemKey) {
    let dataStorage = localStorage.getItem('data_'+itemKey);
    return dataStorage
}

function onclickCreateRoom() {
    let title = document.querySelector("#markdown_title").value
    createRoom({name:title})
}

function createRoom(data) {
    let lists = [];
    let room_list = JSON.parse(localStorage.getItem('room_list'));
    if (room_list == null) {
        lists.push(data)
        localStorage.setItem('room_list', JSON.stringify(lists));
    } else {
        lists = room_list
        lists.push(data)
        localStorage.setItem('room_list', JSON.stringify(lists));
    }
    loadRoom() 
}

function loadRoom() {
    let room_list = JSON.parse(localStorage.getItem('room_list'))
    try {
        patchRoom(room_list)
    } catch (error) {
        let room_list = JSON.parse(localStorage.getItem('room_list'));

    }

    return room_list
}

function patchRoom(lists) {
    let body_list = document.querySelector("#md_lists")
    body_list.innerHTML = ''
    lists.forEach(element => {
        body_list.insertAdjacentHTML('beforeend', `<div class="alert alert-light" onclick="locationMarkdown('${element.name}')"><b>${element.name}.md</b></div>`)
    });
}


function locationMarkdown(name) {
    location.href = window.location.href+'#'+name;
    location.reload();
}

function downloadData(itemKey) {
    let dataStorage = localStorage.getItem('data_'+itemKey);
    let dataBlob = new Blob([dataStorage], {type: 'text/plain'});
    let downloadUrl = URL.createObjectURL(dataBlob);
    let a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${itemKey}.md`;
    a.click();
    a.remove();
    URL.revokeObjectURL(downloadUrl);
}