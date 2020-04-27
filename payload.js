

module.exports = {
    buildUser: (id, password = "", name, isGoogle, email) => {
        return {
            "_id": id,
            "password": password,
            "name": name,
            'isGoogle': isGoogle,
            'email': email
        }
    },
    buildList: (name = "all tasks", tasks = []) => {
        return {
            name: name,
            "tasks": tasks
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


