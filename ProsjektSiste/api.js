fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => {
        return res.json();
    })
    .then(data => {
        data.forEach(user => {
            const markup = `<li>${user.name},  Mail: ${user.email}</li>`;
            document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
        });
    });