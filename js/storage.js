function saveData(itemKey, data) {
    localStorage.setItem('data_'+itemKey, data);
    return 1
}

function loadData(itemKey) {
    let dataStorage = localStorage.getItem('data_'+itemKey);
    return dataStorage
}
