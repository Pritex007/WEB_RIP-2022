

const data = [
    'Берик Дондаррион',
    'Леди Мелиссандра',
    'Полливер',
    'Уолдер Фрей',
    'Тайвин Ланнистер',
    'Сир Мерин Трэнт',
    'Король Джоффри',
    'Сир Илин Пейн',
    'Гора',
    'Пес',
    'Серсея Ланнистер',
]

function StartPage() {
    return (
        <div className="card" style="width: 300px;">
            <img className="card-img-top" src="https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg" alt="картинка"/>
                <div className="card-body">
                    <h5 className="card-title">Название</h5>
                    <p className="card-text">Текст</p>
                    <button className="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">
                        Нажми на меня
                    </button>
                </div>
        </div>
    );
}

export default StartPage;