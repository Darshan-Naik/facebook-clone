function filterFriends(users, friends, user) {
    
    if( friends.length === 0 ) {
        return users
    }

    let output = [];
    let suggestedPeople = [];

    for( let i=0; i<users.length; i++ ) {
        if( !JSON.stringify(friends).includes( users[i].uid ) ) {
            output.push( users[i] )
        }
    }

    if( output.length === 0 ) {
        return [];
    }

    output = output.filter(el => el.uid !== user.uid);

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