class HttpApi {

    USERS_API = "https://615f2997f7254d0017067fdb.mockapi.io/register";
    GAMES_API = "https://615f2997f7254d0017067fdb.mockapi.io/List";
    REVIEWS_API = "https://615f2997f7254d0017067fdb.mockapi.io/reviews";


    register(user) {
        $.ajax({
            url: this.USERS_API,
            type: 'POST',
            dataType: 'json',
            data: user
        }).done(function (response) {
            if (response.id) {
                console.log('succes')
                $('.custom-p-register').show();
            }
        })
    }

    login(user) {
        $.ajax({
            url: `${this.USERS_API}?email=${user.email}`,
            type: 'GET',
            dataType: 'json'
        }).done(function (response) {

            if (response.length === 0) {
                $('#error-email').show();
                return;
            }

            let userFromDatabase = response[0];
            if (user.password === userFromDatabase.password) {
                Utils.redirect('homepage.html');
                Utils.localStorageSet('LoggedInID', userFromDatabase.id)
            } else {
                $('#error-password').show();
            }
        })
    }

    saveGame(game) {
        $.ajax({
            url: this.GAMES_API,
            type: 'POST',
            dataType: 'json',
            data: game
        }).done(function (response) {
            if (response.id) {
                $('#game-success').show()
                $('#game-error').hide()
                $('#game-error2').hide()
            }
        })
    }


    listGames() {
        $.ajax({
            url: this.GAMES_API,
            type: 'GET',
            dataType: 'json'
        }).done(function (response) {
            if (response && response.length !== 0) {
                Utils.renderGamesInPage(response);
            }
        })
    }

    show(id) {
        $.ajax({
            url: `${this.GAMES_API}/${id}`,
            type: 'GET',
            dataType: 'json'
        }).done(function (response) {
            Utils.renderGameInView(response)
        })
    }

    showGameEditApi(id) {
        $.ajax({
            url: `${this.GAMES_API}/${id}`,
            type: 'GET',
            dataType: 'json'
        }).done(function (response) {
            Utils.showGameInputs(response);
        })
    }

    updateGameInApi(game, id) {
        $.ajax({
            url: `${this.GAMES_API}/${id}`,
            type: 'PUT',
            dataType: 'json',
            data: game
        }).done(function (response) {
            if (response.id) {
                $('#edit-game-success').show()
                $('#game-error').hide()
                $('#game-error2').hide()
            }
        })
    }

    delete(id, target) {
        $.ajax({
            url: `${this.GAMES_API}/${id}`,
            type: 'DELETE',
            dataType: 'json'
        }).done(function (response) {
            $(`[data-id="${id}"]`).remove();
        })
    }

    getUserFromApi(id) {
        $.ajax({
            url: `${this.USERS_API}/${id}`,
            type: 'GET',
            dataType: 'json'
        }).done(function (response) {
            Utils.renderUserInPage(response)
        })
    }

    getUserProfileFromApi(id) {
        $.ajax({
            url: `${this.USERS_API}/${id}`,
            type: 'GET',
            dataType: 'json'
        }).done(function (response) {
            Utils.renderUserPreofile(response)
        })
    }

    getUserNameFromApi(id) {
        $.ajax({
            url: `${this.USERS_API}/${id}`,
            type: 'GET',
            dataType: 'json'
        }).done(function (response) {
            Utils.addNameToReview(response)
        })
    }

    createReview(review) {
        $.ajax({
            url: this.REVIEWS_API,
            type: 'POST',
            dataType: 'json',
            data: review
        }).done(function (response) {
            if (response.id) {
                $('#review-success').show()
                $('#review-error').hide()
            }
        })
    }

    getReviewFromApi(gameId) {
        $.ajax({
            url: `${this.REVIEWS_API}/?gameId=${gameId}`,
            type: 'GET',
            dataType: 'json'
        }).done(function (resposne) {
            Utils.showReviewInPage(resposne, gameId);
        })
    }

}