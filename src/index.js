import './styles/main.scss';
'use strict';

const cardsCortainer = document.querySelector('.cards__wr');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu__list');
const buttons = document.querySelectorAll('.request');
const headerContacts = document.querySelector('.header__contacts');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const modalThanks = document.querySelector('.modal__thanks');
const closeBtn = document.querySelector('.modal__close');
const form = document.querySelector('#form');
const nameInp = document.querySelector('#name');
const phoneInp = document.querySelector('#phone')
const getMore = document.querySelector('.cards__btn');
const allNewPosts = [];
let postsToDraw = [];

const regexp = /^((\+7|7|8)+([0-9]){10})$/;
const drawCards = (arr) => {
    cardsCortainer.innerHTML = ''
    arr.forEach(card => {
        cardsCortainer.innerHTML += `
            <div class="card">
                <div class="card__pic">
                    <img class="card__img" alt="" src='${card.img}'>
                </div>
                <div class="card__info">
                    <div class="card__main">
                        <h4 class="card__title">${card.title}</h4>
                        <div class="card__subtitle">
                            ${card.subtitle}
                        </div>
                        <p class="card__desc">${card.desc}</p>
                        <p class="card__date">Posted by <strong>Evgeniya</strong>, on ${card.postedOn}</p>
                    </div>
                    <a href=${card.link} class="card__btn">Continue reading</a>
                </div>
            </div>
        `
    });
}

const toggleMenu = () => {
    menu.classList.toggle('active');
    burger.classList.toggle('active')
    headerContacts.classList.toggle('mobile')
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'visible'
    }
}


function getRandomArbitrary() {
    const num=Math.floor(Math.random() * 9);
    return `/images/img${num + 1}.jpg`
  }



const toggleModal = () => {
    modal.classList.toggle('active')
}

const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkName() || !checkPhone()) {
        return
    } else {
        modal.classList.add('active')
        modalContent.classList.add('hide')
        modalThanks.innerHTML= `Спасибо, что выбрали нас, ${nameInp.value}!`
        setTimeout(() => {
            modal.classList.remove('active')
            modalContent.classList.remove('hide')
            modalThanks.innerHTML = ''
        }, 2000)
        nameInp.value = ''
        phoneInp.value = ''
    }
}

const checkName = () => {
    let parent = nameInp.closest('.custom-input');
    const err = parent.querySelector('.custom-input__error')
    if (nameInp.value.trim().length > 3) {
        err.innerHTML = ''
        return true
    } else {
        err.innerHTML = 'Имя должно содержать не мене 3 символов'
        return false
    }
}

const checkPhone = () => {
    console.log(regexp.test(phoneInp.value))
    let parent = phoneInp.closest('.custom-input');
    const err = parent.querySelector('.custom-input__error')
    if (regexp.test(phoneInp.value)) {
        err.innerHTML = ''
        return true
    } else {
        err.innerHTML = 'Введите корректный номер телефона'
        return false
    }
}


const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            posts = posts.map((post) => ({
                id: post.id,
                img: getRandomArbitrary(),
                subtitle: post.body,
                desc: post.title,
                postedOn: 'July 2023',
                link: '/',
                title: post.title
            }))
            allNewPosts.push(...posts)
            postsToDraw = allNewPosts.slice(0, 10)
            drawCards(postsToDraw);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
  });

}

getPosts()

const addPosts =() => {
    const ind = postsToDraw.length;
    const nextPosts = allNewPosts.slice(ind, ind + 5);
    postsToDraw.push(...nextPosts)
    if (postsToDraw.length === 30) {
        getMore.style.display='none'
    }
    drawCards(postsToDraw)
}



burger.addEventListener('click', toggleMenu)
buttons.forEach((btn) => btn.addEventListener('click', toggleModal));
closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
})

form.addEventListener('submit', handleSubmit);

getMore.addEventListener('click', addPosts)

