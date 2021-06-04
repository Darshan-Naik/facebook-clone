function friendsList ( users, friends ) {
    if( friends.length === 0 || users.length === 0 ) {
        return []
    }
    
    let output = []
    for( let i=0; i<users.length; i++ ) {
        if( JSON.stringify(friends).includes( users[i].uid ) ) {
            output.push( users[i] )
        }
    }

    return output;
}

export default friendsList;