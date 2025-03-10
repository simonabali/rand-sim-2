class User {
    constructor(name) {
        this.name = name
    }

    sendMessage(message, to) {
        return $.post('/message', { sender: this.name, text: message, to })
    }

   addFriend (user) {
        if (user){
            let data = {"currentUser": this.name, "friendToAdd": user}
            $.ajax({
                method: "PUT",
                url: "/friend" ,
                data: data,
                success: function(data){ console.log("PUT successful")},
                error: function(xhr, text, error){console.log(text)}
        })
    }
}
}
