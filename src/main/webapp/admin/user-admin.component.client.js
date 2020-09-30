(function () {
    var userService = new UserService();
    var rowTemplate;
    var tbody;
    var createUserBtn;
    var deleteUserBtn;
    var editUserBtn;
    var updateUserBtn;
    var loading;
    var editedUserInput;
    var selectedUsersList = [];
    var editedUsersList = [];
    var userList = [];
    const properties = [
        { 
            name: 'username',
            classname: 'wbdv-username',
        },
        {
            name: 'first',
            classname: 'wbdv-first-name',
        },
        {
            name: 'last',
            classname: 'wbdv-last-name',
        },
    ];

    jQuery(main);
    
    function main() {
        rowTemplate = jQuery('.wbdv-template');
        createUserBtn = jQuery('.wbdv-create');
        updateUserBtn = jQuery('.wbdv-update');

        tbody = jQuery('tbody');
        loading = jQuery('.overlay');

        createUserBtn.click(createUser);
        updateUserBtn.click(updateUsers);

        userService.findAllUsers().then(renderUsers);
    }

    function editUser(event) {
        const id = event.target.id;
        const row = tbody.find(`#row-${id}`);
        const selectedUser = userList.find((e) => e._id == id);
        const editedFound = editedUsersList.find((e) => e._id == id);
        
        if (!editedFound) {
            editedUsersList.push(selectedUser);
        }

        if (!selectedUsersList.includes(id)) {
            row.css('background-color', '#e6e6e6');

            for (var p in properties) {
                const name = properties[p].name;
                const index = editedUsersList.findIndex((e) => e._id == id);

                const value = editedFound ?
                (editedUsersList[index][name]) :    
                (selectedUser[name] ? selectedUser[name] : '');

                const element = `<input id='input-${name}-${id}' class='wbdv-input' value='${value}'></input>`
                row.find(`td .${properties[p].classname}`).replaceWith(element);
            }

            const selectElement =
            `<select id="input-role-${id}" class="form-control wbdv-input"><option value="Faculty">Faculty</option><option value="Student">Student</option><option value="Admin">Admin</option></select>`
            row.find('td .wbdv-role').replaceWith(selectElement);

            editedUserInput = jQuery('.wbdv-input');
            editedUserInput.change(updateUserProperty);
            selectedUsersList.push(id);
            
        } else {
            for (var p in properties) {
                const name = properties[p].name;
                const value = row.find(`td #input-${name}-${id}`).val();
                const element = `<div class='${properties[p].classname}'>${value}</input>`
                row.find(`td #input-${name}-${id}`).replaceWith(element);
            }

            const value = row.find(`td #input-role-${id}`).val();
            const element = `<div class="wbdv-role">${value}</div>`;
            row.find(`td #input-role-${id}`).replaceWith(element);

            row.css('background-color', '#FFF');
            const index = selectedUsersList.indexOf(id);
            selectedUsersList.splice(index, 1);
        }
    }

    function updateUserProperty(event) {
        const target = event.target.id.split('-');
        const selectedUser = editedUsersList.findIndex((e) => e._id == target[2]);
        editedUsersList[selectedUser][target[1]] = event.target.value;
    }

    function updateUsers() {
        Promise.all(editedUsersList.map(user =>
            userService.updateUser(user._id, user).then(resp => resp.text())
        )).then(texts => {
            userService.findAllUsers().then(renderUsers);
            editedUsersList = [];
        })
    }

    function deleteUser(event) {
        loading.removeClass('wbdv-hidden');
        userService.deleteUserById(event.target.id).then(userService.findAllUsers().then(renderUsers));
    }
    
    function createUser() {
        var username = jQuery('#usernameFld').val();
        var first = jQuery('#firstNameFld').val();
        var last = jQuery('#lastNameFld').val();
        var role = jQuery('#roleFld').val();

        var user = {
            username: username,
            first: first,
            last: last,
            role: role,
        };

        userService
            .createUser(user)
            .then(renderUsers)
    }

    function renderUsers(users) {
        tbody.empty();
        userList = users;
        for (var u in users) {
            const user = users[u];
            const role = user.role ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1).toLowerCase()}` : 'None';
            const rowClone = rowTemplate.clone();
            rowClone.removeClass('wbdv-hidden');
            rowClone.find('.wbdv-first-name').html(user.first);
            rowClone.find('.wbdv-last-name').html(user.last);
            rowClone.find('.wbdv-role').html(role);
            rowClone.find('.wbdv-username').html(user.username);
            rowClone.attr('id', `row-${user._id}`);
            rowClone.find('.wbdv-actions .float-right .btn .fa').attr('id', user._id);
            tbody.append(rowClone);
        }

        deleteUserBtn = jQuery('.wbdv-remove');
        editUserBtn = jQuery('.wbdv-edit');
        deleteUserBtn.click(deleteUser);
        editUserBtn.click(editUser);

        loading.addClass('wbdv-hidden');
    }
})()