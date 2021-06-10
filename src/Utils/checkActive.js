function checkActive(date){
    try{
        date= new Date(date.toDate()).toISOString();//"2021-06-08T07:57:45.065Z"
        let oneInput="";
        let seconds= Math.floor((new Date() - new Date(date)) / 1000);
        let leadingText=" ago";
        if(seconds<0){
            return "Active Now";
        }
        
        const intervals = [[86400, "day"],[3600, "h"],[60, "m"],[1, "s"]];
    
        let interval = seconds;
        let intervalStrings = [];
        for(let i = 0; i < intervals.length; i++){
        let divResult = Math.floor(interval / intervals[i][0]);
            if (divResult > 0){
                if(i===3){
                    return "Active Now"
                }else if(i===2 && divResult<=2){
                    return "Active Now"
                }else if(i===2 && divResult>2){
                    intervalStrings.push(divResult + " " + intervals[i][1] +  "");
                    interval = interval % intervals[i][0];
                    if(!oneInput){
                        break;
                    }

                }else if(i===1){
                    intervalStrings.push(divResult + " " + intervals[i][1] +  "");
                    interval = interval % intervals[i][0];
                    if(!oneInput){
                        break;
                    }

                }else if(i===0){
                    return false;
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

export default checkActive;