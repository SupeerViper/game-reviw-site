class Utils {
    static redirect(path) {
        window.location.href = path;
    }

    static renderGamesInPage(games) {
        let html = '';

        for (let index = 0; index < games.length; index++) {
            const game = games[index];

            html = html + `<div class="custom-item" data-id="${game.id}">
                            <img class="custom-image" src="${game.image}" alt="">
                            <div class="custom-text">
                                <p class="titlu">${game.title}</p>
                                <p class="description">${game.description}</p>
                            </div>
                            <div class="custom-buttons">
                                <a href="show.html?id=${game.id}" role="button" class="btn fs-5 btn-outline-light me-2 button1" data-id="${game.id}">view</a>
                                <p class="sign">|</p>
                                <a href="#" role="button" class="btn fs-5 btn-outline-light me-2 button1 delete-button" data-id="${game.id}">delete</a>
                            </div>
                           </div>`
        }

        $('#grid1').html(html);
    }

    static imageVerifyFunction(target, pattern) {
        var value = 0;
        pattern.forEach(function (word) {
            value = value + target.includes(word);
        });
        return (value === 1)
    }

    static renderGameInView(game) {
        let html1 = `<h1 class="custom-h1">${game.title}</h1>
                    <img class="custom-image" src="${game.image}" alt="" width="280" height="160">
                    <p class="custom-p">${game.description}</p>`

        let html2 = `<p class="custom-p-description">${game.descriptionLong}</p>
                     <a class="btn fs-5 btn-outline-light me-2 add-review-button" href="review.html?gameId=${game.id}">Adăugați review</a>`

        let html3 = `<p class="custom-p-edit">Pentru a edita contentul acestui joc apăsați aici: <a class="custom-link" href="edit.html?id=${game.id}">Edit</a></p>`

        $('.custom-flex-container').html(html1)
        $('.description-box').html(html2)
        $('.edit').html(html3)
    }

    static showGameInputs(game) {
        $('#edit-game-title').val(game.title);
        $('#edit-game-description').val(game.description);
        $('#edit-game-image').val(game.image);
        $('#edit-description-long').val(game.descriptionLong);
        $('#edit-custom-button').attr('data-id', game.id);
    }

    static localStorageSet(key, value) {
        window.localStorage.setItem(key, value);
    }

    static localStorageGet(key) {
        return window.localStorage.getItem(key);
    }

    static localStorageRemove(key) {
        window.localStorage.removeItem(key);
    }

    static renderUserInPage(user) {
        let html = `<button type="button" class="btn fs-4 btn-outline-light me-2 dropdown-toggle custom-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        ${user.name}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="profile.html?id=${user.id}" data-id="${user.id}">Profile</a></li>
                        <form onsubmit="LogOutUser(event)">
                            <input type="submit" class="btn dropdown-item me-2 logout-button" value="Logout"/>
                        </form>
                    </ul>`

        $('.show-user-name').html(html)
    }

    static renderUserPreofile(user) {
        let html = `<h1 class="user-name">${user.name}</h1>
                    <p class="custom-p-user-description">Salut sunteți pe pagina userului ${user.name}. Pagina de profil este o metodă bună de a, arăta meritele și rankul userului pe acest site, după cum se poate observa și la badgeurile de mai jos.</p>
                    <p class="p-badge">Badges:</p>
                    <div class="badges">
                        <span class="badge rounded-pill bg-primary custom-badge-user">User</span>
                        <span class="badge rounded-pill bg-success custom-vip">Vip</span>
                        <span class="badge rounded-pill bg-danger custom-admin">Admin</span>
                    </div>
                    <div class="back-to">
                        <p class="custom-p-back">Back to:</p>
                        <form action="homepage.html">
                            <input type="submit" class="btn fs-7 rounded-pill btn-outline-light me-2" value="Home"/>
                        </form>
                        <form action="list.html">
                            <input type="submit" class="btn fs-7 rounded-pill btn-outline-light me-2" value="List"/>
                        </form>
                    </div>`

        $('.items').html(html)
    }

    static addNameToReview(user) {
        $('#review-name-create').val(user.name)
    }

    static showReviewInPage(review, id) {
        let html = '';

        let invalidEntries = 0

        function filterByID(item) {
            if (item.gameId === id) {
                return true
            }
            invalidEntries++
            return false;
        }

        let rightReview = review.filter(filterByID)

        console.log('Filtered Array', rightReview)

        for (let index = 0; index < rightReview.length; index++) {

            const reviewSlot = rightReview[index];

            html = html + `<div class="review${reviewSlot.id}">
                                <div class="custom-div-review"><p class="custom-p-review">${reviewSlot.star}/5 <img src="../css/image/starsvg.svg" alt="" width="20" height="20">REVIEW:</p>${reviewSlot.review}     by ${reviewSlot.name}</div>
                           </div>`
        }

        $('.reviews').html(html)
    }

}