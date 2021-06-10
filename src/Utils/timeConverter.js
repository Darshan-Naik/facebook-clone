function timeConverter(date){
    try{
        date= new Date(date.toDate()).toISOString();//"2021-06-08T07:57:45.065Z"
        let oneInput="";
        let seconds= Math.floor((new Date() - new Date(date)) / 1000);
        let leadingText=" ago";

        const intervals = [[31536000, "year"],[2592000, "month"],[86400, "day"],[3600, "hour"],[60, "minute"],[1, "second"]];
    
        let interval = seconds;
        let intervalStrings = [];
        for(let i = 0; i < intervals.length; i++){
        let divResult = Math.floor(interval / intervals[i][0]);
            if (divResult > 0){
                intervalStrings.push(divResult + " " + intervals[i][1] + ((divResult > 1) ? "s" : ""));
                interval = interval % intervals[i][0];
                if(!oneInput){
                break;
                }
            }
        }
        
        let intStr = intervalStrings.join(", ");

        return intStr + leadingText;

    }
    catch{
        return false;
    }
    
}

export default timeConverter;