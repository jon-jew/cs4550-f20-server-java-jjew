function UserService() {

    this.findAllUsers = findAllUsers;
    this.createUser = createUser;
    this.deleteUserById = deleteUserById;
    this.updateUser = updateUser;

    // POST - Create
    function createUser(user) {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/jannunzi/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            return findAllUsers();
        })
    }
    
    // GET - Read
    function findAllUsers() {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/jannunzi/users')
            .then(function(response){
                return response.json()
        })
    }

    function deleteUserById(id) {
        return fetch(`https://wbdv-generic-server.herokuapp.com/api/jannunzi/users/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response.json()
        })
    }

    function updateUser(userId, user) {
        return fetch(`https://wbdv-generic-server.herokuapp.com/api/jannunzi/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response){
            return response;
        })
    }
}