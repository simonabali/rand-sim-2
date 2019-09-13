const renderer = new Renderer()

LOGIN_TEMPLATE = "login-template"
LOGIN_AREA = "login-area"

MESSAGES_TEMPLATE = "messages-template"
MESSAGE_AREA = "messages-area"

FRIENDS_TEMPLATE = "friends-template"
FRIEND_AREA = "friends-area"



const render = (templateID, data, destination) => renderer.render(templateID, data, destination)
let user

const logIn = function () {
    const username = $("#username").val()
    $.post('/login', { username }, function (u) {
        user = new User(username)
        render(LOGIN_TEMPLATE, { isLoggedIn: true, username }, LOGIN_AREA)
        render(MESSAGES_TEMPLATE, { messages: u.messages }, MESSAGE_AREA)
    })
}



const addFriend = function () {
    const friendName = $("#addFriend").val()
    let userName = user.name
    user.addFriend(friendName).then(getFriends(userName))
    //.then(render(FRIENDS_TEMPLATE, res, FRIEND_AREA))
}

const getFriends = function (user) {
    return $.ajax({
        method: "GET",
        url: `/friends/${user}`,
        success: function (res) {
            let data = {}
            res.forEach(r => data.push(r))
            render(FRIENDS_TEMPLATE, data, FRIEND_AREA)
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
}

const logOut = function () {
    user = undefined
    render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)
    renderer.clear()
}

const sendMessage = function () {
    const completeRequest = user.sendMessage($("#new-message").val(), $("#to").val())
    completeRequest.then(function () {
        render(MESSAGES_TEMPLATE, { messages: user.messages }, MESSAGE_AREA)
    })
}

render(LOGIN_TEMPLATE, { isLoggedIn: false }, LOGIN_AREA)