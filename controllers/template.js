

module.exports = {
    buildUser: (payload) => {
        return {
            "_id": payload['_id'],
            "password": payload['password'],
            "name": payload['name'],
            'isGoogle': payload['isGoogle'],
            'email': payload['email']
        }
    },
    buildList: (payload) => {
        return {
            "name": payload["listName"],
            "tasks": payload["task"]
        }
    },
    buildUserList: (payload) => {
        return {
            "_id": payload["_id"],
            "lists": [
                {
                    "name": "all tasks",
                    "tasks": []
                }
            ]
        }
    },

    buildTask: (title, tf, dt, detail = { "note": "", "location": "" }, done, id) => {
        return {
            "id": id, // id in Array
            "title": title,
            "timeFrame": tf,
            "data": dt,
            "detail": detail,
            "done": done,
        }
    },
    buildDetail: (note = "", location = "") => {
        return {
            "note": note,
            "location": location
        }
    }
}


