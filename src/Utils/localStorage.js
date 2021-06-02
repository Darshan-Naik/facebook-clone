const saveData =(key,data)=>{
    localStorage.setItem(key,JSON.stringify(data))
}

const loadData =(key)=>{
    try{
        let data=   localStorage.getItem(key)
        return JSON.parse(data)
    }
    catch{
        return false;
    }
}

export {saveData,loadData}