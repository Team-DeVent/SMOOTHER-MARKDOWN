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
    let is_vaild = 1;
    let room_list = JSON.parse(localStorage.getItem('room_list'));
    let room_duplicate = room_list.map( function( item ) { return item['name']; }).indexOf(data.name)

    if (room_duplicate != -1) {
        is_vaild = 0
    } 

    if (is_vaild) {
        if (room_list == null) {
            lists.push(data)
            localStorage.setItem('room_list', JSON.stringify(lists));
        } else {
            lists = room_list
            lists.push(data)
            localStorage.setItem('room_list', JSON.stringify(lists));
        }
        loadRoom() 
        modal.hide()
        Swal.fire(
            '생성 완료',
            '문서가 성공적으로 생성되었습니다',
            'success'
        )
    } else {
        Swal.fire(
            '생성 실패',
            '이름 중복을 확인해주세요',
            'error'
        )
    }

}

function removeRoom(roomKey) {
    let lists = [];
    let room_list = JSON.parse(localStorage.getItem('room_list'));
    if (room_list !== null) {
        lists = room_list
        filtered = lists.filter((element) => element.name !== roomKey);
        localStorage.setItem('room_list', JSON.stringify(filtered));

        Swal.fire(
            '삭제 완료',
            '문서가 성공적으로 삭제되었습니다',
            'success'
        )

        setTimeout(() => {
            location.href = '/app.html'
        }, 500);
    }
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