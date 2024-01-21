(function () {
    const login = <HTMLButtonElement>document.getElementById('login')
    if (!login) {
        console.log('No button')
        return
    }

    login.addEventListener('click', async () => {
        const username = (<HTMLInputElement>document.getElementById('username')).value
        const password = (<HTMLInputElement>document.getElementById('password')).value
        
        if (!username || !password) {
            alert('Please enter your username and password')
            return
        }

        try {
            const response = await fetch('/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            const jsonResponse = await response.json()

            if (jsonResponse.success) {
                alert('Login succeeded')
            }
            else if (jsonResponse.tooMany) {
                alert('Too many attempts. Please try again later')
            }
            else {
                alert('Invalid credentials')
            }
        } catch (err) {
            console.log('Error', err)
        }
    })
})()
