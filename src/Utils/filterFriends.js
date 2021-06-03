function filterFriends(users, friends) {
    
    if( friends.length === 0 ) {
        return users
    }

    let output = [];
    let suggestedPeople = [];

    for( let i=0; i<users.length; i++ ) {
        for( let j=0; j<friends.length; j++ ) {
            if( users[i].uid !== friends[j].friendId) {
                output.push(users[i])
            }
        }
    }

    if( output.length === 0 ) {
        return [];
    }

    // for( let i=0; i<output.length; i++ ) {
    //     if(  )
    // }

    let check = [];
    for( let i=0; i<output.length; i++ ) {
        let randomValue = Math.floor( Math.random() * output.length );
        
        if( !check.includes( randomValue ) ) {
            suggestedPeople.push( output[ randomValue ] );
            check.push( randomValue );
        }
    }


    return suggestedPeople
}

export default filterFriends;