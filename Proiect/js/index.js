let httpApi = new HttpApi();

function register(event) {
    event.preventDefault();

    let name = $('.register-name').val();
    let email = $('.register-email').val();
    let password = $('.register-password').val();

    let user = new User(name, email, password);
    httpApi.register(user);
}

function login(event) {
    event.preventDefault();

    let email = $('.input-email').val();
    let password = $('.input-password').val();

    let user = new User('', email, password);
    httpApi.login(user);
}

function createGame(event) {
    event.preventDefault();

    let title = $('#game-title').val();
    let description = $('#game-description').val();
    let image = $('#game-image').val();
    let descriptionLong = $('#description-long').val();

    let imageVerify = ['.jpeg', '.jpg', '.png']
    let verification = Utils.imageVerifyFunction(image, imageVerify)

    if (description.length < 90 && verification === true && descriptionLong.length < 900 && descriptionLong.length > 600) {
        let game = new Game(title, description, image, descriptionLong)

        httpApi.saveGame(game);
    } else {
       $('#game-error').show();
       $('#game-error2').show();  
    }

}

function showGames() {
    httpApi.listGames();
}

function viewGame() {
    let urlSearch = new URLSearchParams(window.location.search);

    let id = urlSearch.get('id');

    httpApi.show(id)
}

function showGameEdit() {
    let urlSearch = new URLSearchParams(window.location.search);

    let id = urlSearch.get('id');

    httpApi.showGameEditApi(id);
}

function updateGame(event) {
    event.preventDefault();

    let title = $('#edit-game-title').val();
    let description = $('#edit-game-description').val();
    let image = $('#edit-game-image').val();
    let descriptionLong = $('#edit-description-long').val();

    let id = $('#edit-custom-button').attr('data-id');

    console.log(descriptionLong.length);

    let imageVerify = ['.jpeg', '.jpg', '.png']
    let verification = Utils.imageVerifyFunction(image, imageVerify)

    if (description.length < 90 && verification === true && descriptionLong.length < 900 && descriptionLong.length > 600) {
        let game = new Game(title, description, image, descriptionLong)

        httpApi.updateGameInApi(game, id);
    } else {
       $('#game-error').show();
       $('#game-error2').show();  
    }
}

function deleteGame() {
    $(document).on('click', '.delete-button', function(event){
        event.preventDefault();

        const id = $(event.currentTarget).attr('data-id');
        
        httpApi.delete(id, event.currentTarget);
    })
}

function getUser() {
    let userId = Utils.localStorageGet('LoggedInID')
    
    if (parseInt(userId) > 0 && parseInt(userId) < 1000) {
        httpApi.getUserFromApi(userId);
    } else {

    }
}

function localStorageLogIn() {
    let LogInId = Utils.localStorageGet('LoggedInID');

    if (parseInt(LogInId) > 0 && parseInt(LogInId) < 1000) {
        $('.login-button').remove()
        $('.inregistrare').remove()
        $('.show-user-name').show()
        $('.list-button').show()
    } else {
        $('.login-button').show()
        $('.inregistrare').show()
        $('.show-user-name').remove()
        $('.list-button').remove()
    }
}

function getUserForProfile() {
    let urlSearch = new URLSearchParams(window.location.search);

    let id = urlSearch.get('id');

    httpApi.getUserProfileFromApi(id);
}

function LogOutUser(event) {
    event.preventDefault()

    Utils.localStorageRemove('LoggedInID');
    Utils.redirect('homepage.html');
}

function loadingScreen() {
    let delay = 500;

    setTimeout(function() {
        $('#loading-screen').hide();
    }, delay);
}

function getUserName() {

    let LogInId = Utils.localStorageGet('LoggedInID');

    httpApi.getUserNameFromApi(LogInId);
}

function saveReview(event) {
    event.preventDefault();

    let urlSearch = new URLSearchParams(window.location.search);

    let gameId = urlSearch.get('gameId');
    let name = $('#review-name-create').val()
    let star = $('#review-star-create').val()
    let reviewText = $('#review-text-create').val()

    if(reviewText.length < 400 && reviewText.length > 230) {
        let review = new Review(gameId, name, star, reviewText)
        httpApi.createReview(review)
    } else {
        $('#review-error').show()
    }
}

function showReview() {
    let urlSearch = new URLSearchParams(window.location.search);

    let gameId = urlSearch.get('id');

    httpApi.getReviewFromApi(gameId);
}